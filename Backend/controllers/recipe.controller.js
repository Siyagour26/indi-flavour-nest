import Recipe from "../models/recipe.model.js";
import axios from "axios";
import fs from "fs";
import path from "path";

//add
export const addRecipe = async (req, res) => {
try {
    let imageName = null;

    // 👉 If file uploaded
    if (req.file) {
      imageName = req.file.filename;
    }

    // 👉 If image URL provided
    else if (req.body.image) {
      const imageUrl = req.body.image;

      const response = await axios({
        url: imageUrl,
        method: "GET",
        responseType: "stream",
      });

      const fileName = Date.now() + ".jpg";
      const filePath = path.join("uploads", fileName);

      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      imageName = fileName;
    }

    const recipe = await Recipe.create({
      recipe_name: req.body.recipe_name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      category: req.body.category,
      region: req.body.region,
      created_by: req.user.id,
      image: imageName,
    });

    res.status(201).json({
      message: "Recipe added",
      data: recipe,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


//all
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      order: [["created_at", "DESC"]],
    });

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//login user
export const getMyRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll({
      where: { created_by: req.user.id },
      order: [["created_at", "DESC"]],
    });

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//by id
export const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);

  } catch (err) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
};

//update
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.created_by !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await recipe.update({
      recipe_name: req.body.recipe_name,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      category: req.body.category,
      region: req.body.region,
      updated_at: new Date(),
    });

    res.json({
      message: "Recipe updated",
      data: recipe,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//dlt
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.created_by !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await recipe.destroy();

    res.json({
      message: "Recipe deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};