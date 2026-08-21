import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api";
import axiosUse from "../../axios";
import Header from "../Header/Header";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosUse.get(Api.GET_RECIPE_BY_ID(id));
        setRecipe(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  if (!recipe) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <>
      <Header />

      <div className="container mt-5">
        <div className="position-relative mb-4 rounded overflow-hidden shadow">
          <img
            src={
              recipe.image
                ? `http://localhost:3000/uploads/${recipe.image}`
                : "https://via.placeholder.com/800x300?text=No+Image"
            }
            alt={recipe.recipe_name}
            className="w-100"
            style={{ height: "300px", objectFit: "cover" }}
          />

          {/* Recipe Name */}
          <div
            className="position-absolute bottom-0 start-0 w-100 text-white"
            style={{
              background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
              padding: "50px 30px 20px",
            }}
          >
            <h2 className="fw-bold mb-0">{recipe.recipe_name}</h2>
          </div>
        </div>

        {/* 📄 Recipe Details */}
        <div className="card shadow p-4 rounded-4">
          <div className="mb-3">
            <span className="badge bg-success me-2">{recipe.category}</span>
            <span className="badge bg-warning text-dark">{recipe.region}</span>
          </div>

          <h5 className="fw-bold mt-3">Ingredients</h5>
          <p>{recipe.ingredients}</p>

          <h5 className="fw-bold mt-3">Instructions</h5>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
