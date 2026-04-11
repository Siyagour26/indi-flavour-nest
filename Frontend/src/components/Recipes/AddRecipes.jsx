import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Api from "../../Api.js";
import axiosUse from "../../axios.js";
import { toast } from "react-toastify";

const AddRecipes = () => {
  const navigate = useNavigate();

  const initialState = {
    form: {
      recipe_name: "",
      ingredients: "",
      instructions: "",
      category: "Breakfast",
      region: "North India",
      image: null,
    },
    loading: false,
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return {
          ...state,
          form: {
            ...state.form,
            [action.field]: action.value,
          },
        };

      case "SET_LOADING":
        return { ...state, loading: action.value };

      default:
        return state;
    }
  }, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleFile = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: "image",
      value: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { recipe_name, ingredients, instructions, image } = state.form;

    if (
      !recipe_name ||
      !ingredients ||
      !instructions ||
      !state.form.category ||
      !state.form.region ||
      !image
    ) {
      toast.info("All fields including image are required");
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", value: true });

      const formData = new FormData();

      formData.append("recipe_name", recipe_name);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      formData.append("category", state.form.category);
      formData.append("region", state.form.region);
      formData.append("image", image);

      await axiosUse.post(Api.ADD_RECIPE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Recipe Added Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed adding recipe");
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  };

  return (
    <>
      <Header />

      <div className="container my-5">
        <div className="card shadow-lg p-5 rounded-4 border-0">
          <h2 className="text-center mb-5 text-success fw-bold">
            Add Recipe
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Recipe Name */}
            <div className="form-floating mb-4">
              <input
                type="text"
                name="recipe_name"
                className="form-control rounded-3"
                placeholder="Recipe Name"
                value={state.form.recipe_name}
                onChange={handleChange}
              />
              <label>Recipe Name</label>
            </div>

            {/* Ingredients */}
            <div className="form-floating mb-4">
              <textarea
                name="ingredients"
                className="form-control rounded-3"
                placeholder="Ingredients"
                style={{ height: "100px" }}
                value={state.form.ingredients}
                onChange={handleChange}
              ></textarea>
              <label>Ingredients</label>
            </div>

            {/* Instructions */}
            <div className="form-floating mb-4">
              <textarea
                name="instructions"
                className="form-control rounded-3"
                placeholder="Instructions"
                style={{ height: "140px" }}
                value={state.form.instructions}
                onChange={handleChange}
              ></textarea>
              <label>Cooking Instructions</label>
            </div>

            {/* Category & Region */}
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <label className="fw-semibold mb-2">Category</label>
                <select
                  name="category"
                  className="form-select rounded-3"
                  value={state.form.category}
                  onChange={handleChange}
                >
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>Snack</option>
                  <option>Dessert</option>
                  <option>Beverage</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="fw-semibold mb-2">Region</label>
                <select
                  name="region"
                  className="form-select rounded-3"
                  value={state.form.region}
                  onChange={handleChange}
                >
                  <option>North India</option>
                  <option>South India</option>
                  <option>East India</option>
                  <option>West India</option>
                  <option>Central India</option>
                  <option>North-East India</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="fw-semibold mb-2">Recipe Image (Upload size 2MB)</label>
              <input
                type="file"
                className="form-control"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFile}
              />
            </div>

            {/* Image Preview */}
            {state.form.image && (
              <div className="mb-4 text-center">
                <img
                  src={URL.createObjectURL(state.form.image)}
                  alt="preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-bold fs-5 shadow-sm hover-scale"
              disabled={state.loading}
            >
              {state.loading ? "Adding..." : "Add Recipe"}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .form-control:focus, .form-select:focus {
          border-color: #198754;
          box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
        }
        .hover-scale {
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .hover-scale:hover {
          transform: scale(1.02);
          box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
        }
      `}</style>
    </>
  );
};

export default AddRecipes;