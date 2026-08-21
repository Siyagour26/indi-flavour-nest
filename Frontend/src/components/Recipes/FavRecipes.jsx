import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosUse from "../../axios";
import Api from "../../Api";
import Header from "../Header/Header";

const Favorites = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH FAVOURITES
  // =========================
  useEffect(() => {
    const getFavorites = async () => {
      try {
        const res = await axiosUse.get(Api.FETCH_FAV);

        console.log("Favorites:", res.data);

        setFavorites(res.data);

      } catch (err) {
        console.log("Favorite Error:", err);

        if (err.response?.status === 401) {
          toast.info("Please login first");
          navigate("/signin");
        } else {
          toast.error("Failed to load favourite recipes");
        }
      } finally {
        setLoading(false);
      }
    };

    getFavorites();
  }, [navigate]);

  // =========================
  // REMOVE FAVOURITE
  // =========================
  const removeFavourite = async (recipeId) => {
    try {
      await axiosUse.delete(
        Api.DELETE_FAV(recipeId)
      );

      setFavorites((prev) =>
        prev.filter(
          (recipe) => recipe.recipe_id !== recipeId
        )
      );

      toast.success("Removed from favourites");

    } catch (err) {
      console.log("Remove Favourite Error:", err);
      toast.error("Failed to remove favourite");
    }
  };

  return (
    <>
      <Header />

      <section className="container mt-5 mb-5">

        {/* TITLE */}
        <h2 className="text-center fw-bold text-danger mb-5">
          ❤️ My Favourite Recipes
        </h2>

        {/* LOADING */}
        {loading ? (
          <div className="text-center mt-5">
            <h4>Loading favourites...</h4>
          </div>

        ) : favorites.length === 0 ? (

          /* EMPTY */
          <div className="text-center py-5">

            <div
              style={{
                fontSize: "70px",
              }}
            >
              ♡
            </div>

            <h4 className="fw-bold mt-3">
              No Favourite Recipes
            </h4>

            <p className="text-muted">
              You haven't added any recipes to
              your favourites yet.
            </p>

            <button
              className="btn btn-success rounded-pill px-4"
              onClick={() => navigate("/")}
            >
              Explore Recipes
            </button>

          </div>

        ) : (

          /* RECIPES */
          <div className="row g-4">

            {favorites.map((r) => (

              <div
                key={r.recipe_id}
                className="col-12 col-md-6 col-lg-4"
              >

                <div className="card h-100 shadow-sm border-0 rounded-4 hover-scale">

                  {/* IMAGE */}
                  {r.image ? (
                    <img
                      src={`http://localhost:3000/uploads/${r.image}`}
                      alt={r.recipe_name}
                      className="card-img-top rounded-top-4"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex justify-content-center align-items-center bg-light rounded-top-4"
                      style={{
                        height: "220px",
                      }}
                    >
                      <span className="text-muted">
                        No Image
                      </span>
                    </div>
                  )}

                  {/* CARD BODY */}
                  <div className="card-body d-flex flex-column">

                    {/* NAME + HEART */}
                    <div className="d-flex justify-content-between align-items-center mb-2">

                      <h5 className="fw-bold mb-0">
                        {r.recipe_name}
                      </h5>

                      <button
                        className="btn p-0 border-0"
                        onClick={() =>
                          removeFavourite(
                            r.recipe_id
                          )
                        }
                        style={{
                          fontSize: "30px",
                          color: "red",
                          background: "none",
                          lineHeight: 1,
                        }}
                        title="Remove from favourites"
                      >
                        ♥
                      </button>

                    </div>

                    {/* CATEGORY + REGION */}
                    <div className="mb-2">

                      <span className="badge bg-success me-2">
                        {r.category}
                      </span>

                      <span className="badge bg-warning text-dark">
                        {r.region}
                      </span>

                    </div>

                    {/* INGREDIENTS */}
                    <p className="text-muted small flex-grow-1">
                      {r.ingredients
                        ? `${r.ingredients.slice(0, 80)}...`
                        : "No ingredients available"}
                    </p>

                    {/* VIEW DETAILS */}
                    <button
                      className="btn btn-success mt-auto"
                      onClick={() =>
                        navigate(
                          `/recipe/${r.recipe_id}`
                        )
                      }
                    >
                      View Details
                    </button>

                  </div>
                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      <style>{`
        .hover-scale {
          transition: all 0.3s ease;
        }

        .hover-scale:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.75rem 1.5rem rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </>
  );
};

export default Favorites;