import Favorite from "../models/favorite.model.js";
import Recipe from "../models/recipe.model.js";

// Add Favorite
export const addFav = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { recipe_id } = req.body;

    const favorite = await Favorite.findOne({
      where: { user_id, recipe_id },
    });

    if (favorite) {
      return res.status(400).json({
        message: "Already in favorites",
      });
    }

    await Favorite.create({
      user_id,
      recipe_id,
    });

    res.status(200).json({
      message: "Added to favorites",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Remove Favorite
export const removeFavorite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { recipe_id } = req.params;

    const favorite = await Favorite.findOne({
      where: { user_id, recipe_id },
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found",
      });
    }

    await favorite.destroy();

    res.status(200).json({
      message: "Removed from favorites",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Toggle Favorite
export const toggleFavorite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { recipe_id } = req.body;

    const favorite = await Favorite.findOne({
      where: { user_id, recipe_id },
    });

    if (favorite) {
      await favorite.destroy();

      return res.status(200).json({
        message: "Removed from favorites",
      });
    }

    await Favorite.create({
      user_id,
      recipe_id,
    });

    res.status(200).json({
      message: "Added to favorites",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// Get All Favorites
export const getFavorites = async (req, res) => {
  try {
    const user_id = req.user.id;

    const favorites = await Favorite.findAll({
      where: { user_id },
    });

    const recipes = [];

    for (const fav of favorites) {
      const recipe = await Recipe.findOne({
        where: {
          recipe_id: fav.recipe_id,
        },
      });

      if (recipe) {
        recipes.push(recipe);
      }
    }

    return res.status(200).json(recipes);

  } catch (err) {
    console.log("GET FAVORITES ERROR:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
};

// Check Favorite
export const isFavorite = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { recipe_id } = req.params;

    const favorite = await Favorite.findOne({
      where: { user_id, recipe_id },
    });

    res.status(200).json({
      isFavorite: favorite ? true : false,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};