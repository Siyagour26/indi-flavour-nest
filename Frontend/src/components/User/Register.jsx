import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../Api.js";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
       let response= await axios.post(Api.USER_SIGNUP, { name, contact, email, password, address })
        console.log(response);
        navigate("/signin");
        toast.success("User Registered");
    }
    catch(err){
        console.log(err);
    }
  }
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", background: "#f8f9fa" }}
      >
        <div
          className="card shadow-lg rounded-5 p-4"
          style={{ width: "100%", maxWidth: "450px" }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="fw-bold text-danger">Sign Up</h3>
            <p className="text-muted">
              Create your account and start sharing recipes!
            </p>
          </div>

          {/* Form */}
          <form>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-3"
                id="name"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="name">Full Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-3"
                id="email"
                placeholder="Enter email id"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email ID</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control rounded-3"
                id="contact"
                placeholder="Enter contact number"
                onChange={(e) => setContact(e.target.value)}
              />
              <label htmlFor="contact">Contact Number</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control rounded-3"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="form-floating mb-4">
              <textarea
                className="form-control rounded-3"
                id="address"
                placeholder="Enter address"
                style={{ height: "80px" }}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
              <label htmlFor="address">Address</label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-danger w-100 py-2 fw-bold hover-scale mb-3"
            >
              Register
            </button>

            <div className="text-center">
              <Link to="/signin" className="text-decoration-none text-primary">
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
    .form-control:focus, .form-select:focus, textarea:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 0.2rem rgba(220,53,69,.25);
    }

    .hover-scale {
      transition: all 0.3s ease;
    }
    .hover-scale:hover {
      transform: scale(1.03);
      box-shadow: 0 0.75rem 1.5rem rgba(0,0,0,0.15);
    }
  `}</style>
    </>
  );
}


export default Register;
