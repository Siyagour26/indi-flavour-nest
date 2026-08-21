import express from "express";
import {
  addFav, removeFavorite, toggleFavorite, getFavorites, isFavorite
} from "../controllers/favorite.controller.js";

import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", auth, addFav);
router.delete("/remove/:recipe_id", auth, removeFavorite);
router.post("/toggle", auth, toggleFavorite);
router.get("/all", auth, getFavorites);
router.get("/:recipe_id", auth, isFavorite);

export default router;