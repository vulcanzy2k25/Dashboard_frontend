import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const HomePage = () => {
  const [clubId, setClubId] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log(decoded);
        setClubId(decoded._id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return <div>Hello from home page {clubId}</div>;
};

export default HomePage;
