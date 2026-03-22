import { checkSafety, recommendSafeFoods } from "../services/foodAllergen.service.js";

export const predictFood = async (req, res) => {
  try {
    const { ingredients, userAllergies } = req.body;
    if (!ingredients) return res.status(400).json({ error: "ingredients required" });

    const safety = checkSafety(ingredients, userAllergies || []);
    const recommendations = recommendSafeFoods(userAllergies || [], 10);

    res.json({
      ingredients,
      ...safety,
      recommendedFoods: recommendations
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
};