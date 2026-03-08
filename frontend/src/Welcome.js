import React from "react";
import "./welcome.css";

const Welcome = () => {
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="welcome-container">
      <h1>Welcome, {username}!</h1>
    </div>
  );
};

export default Welcome;
