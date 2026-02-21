import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosConfig";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    role: "" 
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return; 
    setError("");
    
   
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const response = await API.post("/user/user-create", formData);
      
      if (response.data.success) {
        alert("User created successfully!");
        navigate("/"); 
      }
    } catch (err) {
      // Catch backend errors (400, 500, etc.)
      const errorMsg = err.response?.data?.message || "Something went wrong";
      setError(errorMsg);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Create Account</h2>
        
        {error && <div className="error-msg" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />
        
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="customer">Customer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        <button 
          type="submit" 
          className="btn primary" 
          disabled={loading} 
        >
          {loading ? "Processing..." : "Register"}
        </button>

        <p>Already have an account? <Link to="/">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
