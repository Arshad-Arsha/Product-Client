import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig"; 
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

const fetchUsers = async () => {
  try {
    const res = await API.get("/user/get-data");
    console.log("Users fetched:", res.data.users); 
    setUsers(res.data.users); 
    console.error("Failed to fetch users:", err);
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/user/delete-data-id/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="user-page">
      <h2>User Management</h2>
      <div className="user-form-section">
        <UserForm 
          fetchUsers={fetchUsers} 
          editUser={editUser} 
          setEditUser={setEditUser} 
        />
      </div>
      <div className="user-table-section">
        <UserTable 
          users={users} 
          setEditUser={setEditUser} 
          handleDelete={handleDelete} 
        />
      </div>
    </div>
  );
};


export default UserList;
