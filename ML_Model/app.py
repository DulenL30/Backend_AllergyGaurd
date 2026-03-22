from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load model once
bundle = joblib.load("food_allergen_model.joblib")
model = bundle["model"]
vectorizer = bundle["vectorizer"]
mlb = bundle["mlb"]
classes = mlb.classes_

# Prediction function
def predict_allergens(text):
    X = vectorizer.transform([text])
    y_pred = model.predict(X)[0]
    return [classes[i] for i, v in enumerate(y_pred) if v == 1]

# Simple recommendation logic
SAFE_FOODS = [
    "rice", "grilled chicken", "vegetable soup",
    "fruit salad", "boiled potatoes", "oats"
]

def recommend_foods(user_allergies):
    safe = []
    for food in SAFE_FOODS:
        allergens = predict_allergens(food)
        if not any(a in user_allergies for a in allergens):
            safe.append(food)
    return safe

@app.route("/food/predict", methods=["POST"])
def predict():
    data = request.get_json()

    ingredients = data.get("ingredients", "")
    user_allergies = data.get("userAllergies", [])

    detected = predict_allergens(ingredients)
    recommendations = recommend_foods(user_allergies)

    return jsonify({
        "detectedAllergens": detected,
        "recommendedFoods": recommendations
    })

@app.route("/")
def home():
    return "✅ Food Allergen API Running"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)