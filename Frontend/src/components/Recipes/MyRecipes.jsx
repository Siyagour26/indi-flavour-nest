import { useEffect, useReducer } from "react";
import Header from "../Header/Header";
import Api from "../../Api.js";
import axiosUse from "../../axios.js";
import { toast } from "react-toastify";

const MyRecipes = () => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      if (action.type === "SET_RECIPES") state.recipes = action.payload;

      return { ...state };
    },
    {
      recipes: [],
    },
  );

  const fetchRecipes = async () => {
    try {
      const res = await axiosUse.get(Api.MY_RECIPES);

      dispatch({
        type: "SET_RECIPES",
        payload: res.data.data || res.data,
      });
    } catch (err) {
      console.log(err);
      toast.error("Failed to load recipes");
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    try {
      await axiosUse.delete(Api.DELETE_RECIPE(id));
      toast.success("Recipe Deleted ");

      dispatch({
        type: "SET_RECIPES",
        payload: state.recipes.filter((r) => r.recipe_id !== id),
      });
    } catch {
      toast.error("Delete failed");
    }
  };

  // Update
  const handleUpdate = async (id) => {
    const newName = prompt("Enter new recipe name:");

    if (!newName) return;

    try {
      await axiosUse.put(Api.UPDATE_RECIPE`/${id}`, {
        recipe_name: newName,
      });

      toast.success("Recipe Updated");

      // update locally
      dispatch({
        type: "SET_RECIPES",
        payload: state.recipes.map((r) =>
          r.recipe_id === id ? { ...r, recipe_name: newName } : r,
        ),
      });
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <>
      <Header />

      <div className="container mt-5">
        <h2 className="text-center mb-5 fw-bold text-success">My Recipes</h2>

        {state.loading ? (
          <h4 className="text-center text-muted">Loading...</h4>
        ) : state.recipes.length === 0 ? (
          <h5 className="text-center text-muted">No recipes found!</h5>
        ) : (
          <div className="row g-4">
            {state.recipes.map((r) => (
              <div key={r.recipe_id} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm h-100 border-0 rounded-4 hover-scale">
                  {/* Card Body */}
                  <div className="card-body d-flex flex-column">
                    {r.image && (
                      <img
                        src={`http://localhost:3000/uploads/${r.image}`}
                        alt={r.recipe_name}
                        className="card-img-top rounded-top-4"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}
                    <h5 className="card-title fw-bold">{r.recipe_name}</h5>

                    <div className="mb-2">
                      <span className="badge bg-success me-2">
                        {r.category}
                      </span>
                      <span className="badge bg-warning text-dark">
                        {r.region}
                      </span>
                    </div>

                    <p className="text-muted small mb-2">
                      <strong>Ingredients:</strong>{" "}
                      {r.ingredients?.slice(0, 80)}...
                    </p>

                    <p className="text-muted small mb-3">
                      <strong>Instructions:</strong>{" "}
                      {r.instructions?.slice(0, 80)}...
                    </p>

                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-outline-warning btn-sm fw-semibold"
                        onClick={() => handleUpdate(r.recipe_id)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm fw-semibold"
                        onClick={() => handleDelete(r.recipe_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style>{`
    .hover-scale {
      transition: all 0.3s ease;
    }
    .hover-scale:hover {
      transform: translateY(-5px);
      box-shadow: 0 1.5rem 2.5rem rgba(0,0,0,0.2);
    }
    .card-body p {
      line-height: 1.4;
    }
  `}</style>
    </>
  );
};

export default MyRecipes;
