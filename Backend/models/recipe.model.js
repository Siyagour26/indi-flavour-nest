import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const Recipe = sequelize.define(
  "recipes",
  {
    recipe_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
     image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM(
        "Breakfast",
        "Lunch",
        "Dinner",
        "Snack",
        "Dessert",
        "Beverage",
      ),
      allowNull: false,
      defaultValue: "Breakfast",
    },
    region: {
      type: DataTypes.ENUM(
        "North India",
        "South India",
        "East India",
        "West India",
        "Central India",
        "North-East India",
      ),
      allowNull: false,
      defaultValue: "North India",
    },

    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  },
);

export default Recipe;
