import express from "express";
import {
  addRecipe,
  getAllRecipes,
  getMyRecipes,
  updateRecipe,
  deleteRecipe,
  getRecipeById,
} from "../controllers/recipe.controller.js";

import { auth } from "../middleware/auth.middleware.js";
import upload from "../multerConfig.js";

const router = express.Router();

router.post("/", auth, upload.single("image"), addRecipe);
router.get("/", getAllRecipes);
router.get("/my", auth, getMyRecipes);
router.get("/:id", getRecipeById);
router.put("/:id", auth, updateRecipe);
router.delete("/:id", auth, deleteRecipe);

export default router;
