import React, { useState } from "react";
import "./style.css";
import Logo from "../components/Logo.jsx";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [clubName, setClubName] = useState("");
  const [password, setPassword] = useState("");
  const apiURL = process.env.apiURL || "http://localhost:5000";
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(apiURL);

    // console.log("SignUp Data:", { clubName, password });
    try {
      const response = await axios.post(`${apiURL}/club/signup`, {
        clubName,
        password,
      });
      alert(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Club name taken already");
      }
    }
  };

  return (
    <div className="form-container">
      <Logo></Logo>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Club Name:</label>
          <input
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">SignUp</button>
      </form>
      <div className="signup-link">
        <p>
          Already have an account? <Link to="/">SignIn</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
