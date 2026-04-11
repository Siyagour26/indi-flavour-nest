import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Api from "../../Api.js";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import foodImg from "../../assets/main.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(6);

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

  let viewMoreBtn = null;
  if (state.recipeList.length > 6 && visibleCount < state.recipeList.length) {
    viewMoreBtn = (
      <div className="text-center mt-4">
        <button
          className="btn btn-outline-success px-4"
          onClick={() => navigate("/all-recipes")}
        >
          View More ↓
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />

      <div
        className="position-relative d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `url(${foodImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "75vh",
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

        <div className="position-relative z-1 container">
          <h1 className="display-5 fw-bold mb-3">Crave It? Cook It!</h1>
          <p className="lead mb-4">
            Discover, cook, and share authentic Indian recipes from every
            region.
          </p>

          <div className="input-group mx-auto" style={{ maxWidth: "500px" }}>
            <input
              type="text"
              className="form-control rounded-start"
              placeholder="Search your recipe..."
            />
            <button className="btn btn-warning rounded-end">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      <section className="container mt-5">
        <h2 className="text-center fw-bold text-success mb-5">
          🍽️ Latest Recipes
        </h2>

        {state.loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          <div className="row g-4">
            {state.recipeList.slice(0, visibleCount).map((r) => (
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
                      <span className="badge bg-success me-2">
                        {r.category}
                      </span>
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
        )}
        {viewMoreBtn}
      </section>

      {/* About*/}
      <section className="bg-light py-5 mt-5">
        <div className="container text-center">
          <h2 className="fw-bold text-success mb-4">About IndieFlavourNest</h2>
          <p className="lead mb-5 text-muted">
            Discover, Cook & Share Authentic Indian Recipes 🍲
          </p>

          <div className="row align-items-center mb-5">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
                alt="food"
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-md-6 text-start">
              <h3 className="fw-semibold">Who We Are</h3>
              <p>
                IndieFlavourNest connects food lovers to explore India’s rich
                culinary diversity. From home recipes to modern twists, we bring
                flavors together in one platform.
              </p>
              <p>
                Our goal is to make cooking simple, enjoyable, and accessible
                for everyone.
              </p>
            </div>
          </div>

          <div className="row text-center g-4">
            <h3 className="mb-4">What We Offer</h3>
            <div className="col-md-6">
              <div className="card p-4 shadow-sm h-100 hover-scale">
                <h5>🍛 Explore Recipes</h5>
                <p>Browse a wide variety of Indian dishes from all regions.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-4 shadow-sm h-100 hover-scale">
                <h5>📝 Share Your Recipes</h5>
                <p>Upload your own recipes and share with the community.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white pt-5">
        <div className="container text-center pb-4">
          <h4>Our Mission</h4>
          <p>
            To connect people through food by preserving and sharing the
            authentic taste of India with the world.
          </p>
        </div>
        <div className="text-center py-3 bg-dark">
          © 2026 IndieFlavourNest | Made with ❤️
        </div>
      </footer>

      {/* Custom Hover Effect */}
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

export default Home;
