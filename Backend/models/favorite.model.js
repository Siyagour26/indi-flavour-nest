import { DataTypes } from "sequelize";
import sequelize from "../dbConfig/dbConfig.js";

const Favorite = sequelize.define("favorites", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  recipe_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Favorite;