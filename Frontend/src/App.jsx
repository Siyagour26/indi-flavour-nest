import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LogIn from "./components/User/Login";
import Register from "./components/User/Register";
import Home from "./components/HomePage/Home";
import MyRecipes from "./components/Recipes/MyRecipes";
import AddRecipes from "./components/Recipes/AddRecipes";
import RecipeDetails from "./components/Recipes/RecipeDetails";
import AllRecipes from "./components/Recipes/AllRecipes";
import Favorites from "./components/Recipes/FavRecipes";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="add" element={<AddRecipes />} />
        <Route path="my" element={<MyRecipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/all-recipes" element={<AllRecipes />} />
        <Route path="signin" element={<LogIn />} />
        <Route path="signup" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
};

export default App;
