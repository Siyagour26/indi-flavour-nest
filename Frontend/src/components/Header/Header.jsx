import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem("token");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
    toast.info("User Logout");
  };

  const handleProtectedRoute = (path) => {
    if (!isLoggedIn) {
      toast.info("Please login first");
      navigate("/signup");
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-black shadow-sm sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold text-warning fs-4" to="/">
          <img src="../logo.png" height={40} width={250}/>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <button
                onClick={() => handleProtectedRoute("/add")}
                className="nav-link text-light fw-medium btn btn-link"
              >
                Add Recipe
              </button>
            </li>

            <li className="nav-item">
              <button
                onClick={() => handleProtectedRoute("/my")}
                className="nav-link text-light fw-medium btn btn-link"
              >
                My Recipes
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={() => handleProtectedRoute("/favorites")}
                className="nav-link text-light fw-medium btn btn-link"
              >
                My Favourites
              </button>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="btn btn-outline-warning ms-lg-3 my-2 my-lg-0 rounded-pill fw-semibold"
                    to="/signin"
                  >
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-warning ms-lg-3 my-2 my-lg-0 rounded-pill fw-semibold text-dark"
                    to="/signup"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger ms-lg-3 my-2 my-lg-0 rounded-pill fw-semibold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Hover Effects */}
      <style>{`
        .navbar-nav .nav-link:hover {
          color: #ffc107 !important;
        }
        .btn:hover {
          transform: scale(1.05);
          transition: 0.3s;
        }
      `}</style>
    </nav>
  );
};

export default Header;
