import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../components/Logo";
import axios from "axios";
import Cookies from "js-cookie";

const Signin = () => {
  const [clubName, setClubName] = useState("");
  const [password, setPassword] = useState("");
  const apiURL = process.env.apiURL || "http://localhost:5000";
  const navigateTo = useNavigate();

  const setCookie = (name, value, days) => {
    Cookies.set(name, value, { expires: days });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Signin Data:", { clubName, password });
    try {
      const response = await axios.post(
        `${apiURL}/club/signin`,
        {
          clubName,
          password,
        }
        // { withCredentials: true }
      );
      // console.log(response.data);
      if (response.data && response.data.message === "Cookie provided") {
        const token = response.data.token;
        setCookie("token", token, 3);
        // console.log("cookie set");
        navigateTo("/homePage");
      }
    } catch (error) {
      // console.log(error);
      alert(
        "Signin failed: " +
          (error.response ? error.response.data.message : "Unknown error")
      );
    }
  };

  return (
    <div className="form-container">
      <Logo></Logo>
      <h2>SignIn</h2>
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
        <button type="submit">SignIn</button>
      </form>
      <div className="signup-link">
        <p>
          Don't have an account? <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
