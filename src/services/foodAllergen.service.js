import fs from "fs";
import path from "path";

// Load all JSON files
const tfidfData = JSON.parse(fs.readFileSync(path.resolve("src/models/tfidf.json")));
const mlbClasses = JSON.parse(fs.readFileSync(path.resolve("src/models/mlb_classes.json")));
const modelData = JSON.parse(fs.readFileSync(path.resolve("src/models/model.json")));
const foodsData = JSON.parse(fs.readFileSync(path.resolve("src/models/foods.json")));

// Sigmoid
const sigmoid = (x) => 1 / (1 + Math.exp(-x));

// TF-IDF vectorization
const vectorizeIngredients = (ingredients) => {
  const vector = new Array(Object.keys(tfidfData.vocab).length).fill(0);
  ingredients.split(",").forEach(word => {
    word = word.trim().toLowerCase();
    if (tfidfData.vocab[word] !== undefined) {
      vector[tfidfData.vocab[word]] = 1 * tfidfData.idf[tfidfData.vocab[word]];
    }
  });
  return vector;
};

// Predict allergens
export const predictAllergen = (ingredients) => {
  const x = vectorizeIngredients(ingredients);
  const detectedAllergens = [];

  for (let i = 0; i < modelData.coef.length; i++) {
    const coef = modelData.coef[i];
    const intercept = modelData.intercept[i];

    let logit = intercept;
    for (let j = 0; j < x.length; j++) {
      logit += x[j] * coef[j];
    }

    const prob = sigmoid(logit);
    if (prob >= 0.5) detectedAllergens.push(mlbClasses[i]);
  }

  return detectedAllergens;
};

// Safety check
export const checkSafety = (ingredients, userAllergies) => {
  const detected = predictAllergen(ingredients);
  const conflict = detected.filter(a => userAllergies.includes(a));

  return {
    status: conflict.length === 0 ? "SAFE" : "UNSAFE",
    detectedAllergens: detected
  };
};

// Recommend safe foods
export const recommendSafeFoods = (userAllergies, topN = 10) => {
  const safeFoods = [];

  for (const item of foodsData) {
    const conflict = item.allergens.filter(a => userAllergies.includes(a));
    if (conflict.length === 0) safeFoods.push(item.food);
  }

  return safeFoods.slice(0, topN);
};