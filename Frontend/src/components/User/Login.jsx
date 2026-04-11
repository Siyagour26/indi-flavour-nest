import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../Api.js";

function LogIn(){
    const emailInput = useRef();
    const passwordInput = useRef();
    const navigate = useNavigate();
    const handleSubmit = async(event)=>{
       try{ 
        event.preventDefault();
        let email = emailInput.current.value;
        let password = passwordInput.current.value;
        let response = await axios.post(Api.USER_SIGNIN,{email,password});
        console.log(response.data);
        toast.success("Sign in success..");
        sessionStorage.setItem("token",response.data.token);
        // sessionStorage.setItem("currentUserId",""+response.data.user.user_id);
        // sessionStorage.setItem("currentUserEmail",response.data.user.email);
        navigate("/");
       }
       catch(err){
         console.log(err);
         toast.error("Sign in failed..");
       }
    }
    return <>
    
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
    <div className="card shadow-lg rounded-4 p-4" style={{ width: "100%", maxWidth: "400px" }}>
      
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="fw-bold text-danger">Sign In</h3>
        <p className="text-muted">Welcome back! Please login to continue.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            ref={emailInput}
            type="email"
            className="form-control rounded-3"
            id="email"
            placeholder="Enter email"
          />
          <label htmlFor="email">Email ID</label>
        </div>

        <div className="form-floating mb-3 position-relative">
          <input
            ref={passwordInput}
            type="password"
            className="form-control rounded-3"
            id="password"
            placeholder="Enter password"
          />
          <label htmlFor="password">Password</label>
        </div>

        <button
          type="submit"
          className="btn btn-danger w-100 py-2 fw-bold hover-scale mb-3"
        >
          Sign In
        </button>

        <div className="text-center">
          <Link to="/signup" className="text-decoration-none text-primary">
            Create new account?
          </Link>
        </div>
      </form>
    </div>
  </div>

  {/* Custom Styles */}
  <style>{`
    .form-control:focus {
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
}

export default LogIn;