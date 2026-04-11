import User from "./user.model.js";
import Recipe from "./recipe.model.js";

User.hasMany(Recipe, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
});

Recipe.belongsTo(User, {
  foreignKey: "created_by",
});