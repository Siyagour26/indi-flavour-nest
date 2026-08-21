import User from "./user.model.js";
import Recipe from "./recipe.model.js";
import Favorite from "./favorite.model.js";

User.hasMany(Recipe, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
});

Recipe.belongsTo(User, {
  foreignKey: "created_by",
});

User.belongsToMany(Recipe, {
  through: Favorite,
  foreignKey: "user_id",
  otherKey: "recipe_id",
  as: "favoriteRecipes",
  onDelete: "CASCADE",
});

Recipe.belongsToMany(User, {
  through: Favorite,
  foreignKey: "recipe_id",
  otherKey: "user_id",
  as: "likedByUsers",
  onDelete: "CASCADE",
});

Favorite.belongsTo(Recipe, {
  foreignKey: "recipe_id",
});

Recipe.hasMany(Favorite, {
  foreignKey: "recipe_id",
});