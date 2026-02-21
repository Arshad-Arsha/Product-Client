// export default UserTable;
import React from "react";

const UserTable = ({ users, setEditUser, handleDelete }) => (
  <table className="table table-striped table-hover table-bordered">
    <thead className="table-dark">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.contact}</td>
          <td>{user.role}</td>
          <td>
            <button className="btn btn-sm btn-warning me-2" onClick={() => setEditUser(user)}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);


export default UserTable;
