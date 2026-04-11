import axios from "axios";
import React, { useEffect, useReducer } from "react";
import Api from "../../Api.js";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { FaSearch } from "react-icons/fa";

const AllRecipes = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "SET_RECIPES") state.recipeList = action.payload;
      return { ...state };
    },
    {
      recipeList: [],
    },
  );

  const loadRecipes = async () => {
    try {
      let response = await axios.get(Api.FETCH_RECIPES);
      console.log(response.data);

      dispatch({
        type: "SET_RECIPES",
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadRecipes();
  }, []);

  return (
    <>
      <Header />

      {/* Page Title */}
      <div className="bg-success text-white text-center py-4">
        <h2 className="fw-bold">🍽️ All Recipes</h2>
        <p className="mb-0">Explore every delicious recipe</p>
      </div>

      {/* Search Bar (optional UI) */}
      <div className="container mt-4">
        <div className="input-group mx-auto" style={{ maxWidth: "500px" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search recipes..."
          />
          <button className="btn btn-warning">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Recipes Grid */}
      <section className="container mt-5">
        <div className="row g-4">
          {state.recipeList.map((r) => (
            <div key={r.recipe_id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0 rounded-4 hover-scale">
                <div className="card-body d-flex flex-column">
                  {r.image && (
                    <img
                      src={`http://localhost:3000/uploads/${r.image}`}
                      alt={r.recipe_name}
                      className="card-img-top rounded-top-4"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <h5 className="fw-bold">{r.recipe_name}</h5>

                  <div className="mb-2">
                    <span className="badge bg-success me-2">{r.category}</span>
                    <span className="badge bg-warning text-dark">
                      {r.region}
                    </span>
                  </div>

                  <p className="text-muted small flex-grow-1">
                    {r.ingredients?.slice(0, 80)}...
                  </p>

                  <button
                    className="btn btn-success mt-2 mt-auto"
                    onClick={() => navigate(`/recipe/${r.recipe_id}`)}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {state.recipeList.length === 0 && (
          <h5 className="text-center mt-5 text-muted">No recipes found 😔</h5>
        )}
      </section>

      {/* Back Button */}
      <div className="text-center mt-5 mb-5">
        <button className="btn btn-outline-dark" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>

      {/* Hover Effect */}
      <style>{`
        .hover-scale {
          transition: transform 0.3s;
        }
        .hover-scale:hover {
          transform: scale(1.03);
        }
      `}</style>
    </>
  );
};

export default AllRecipes;
