import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="page-container">
      <h1>Dashboard</h1>
      <div className="card">
        <h2>Welcome back!</h2>
        <p>Your current role is: <strong>{user?.role.toUpperCase()}</strong></p>
        <p>Navigate to the Products tab to view items.</p>
        {user?.role === "seller" && <p>As a seller, you can add, edit, and delete your products.</p>}
        {user?.role === "admin" && <p>As an admin, you have full privileges to edit system data.</p>}
      </div>
    </div>
  );
};

export default Dashboard;