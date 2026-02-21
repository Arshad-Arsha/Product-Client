// import React, { useState, useEffect } from "react";
// import API from "../api/axiosConfig";
// const UserForm = ({ fetchUsers, editUser, setEditUser }) => {
//   const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "", contact: "", role: "" });
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (editUser) setForm({ ...editUser, password: "", confirmPassword: "" });
//   }, [editUser]);

//   const validate = () => {
//     let newErrors = {};
//     if (!form.username) newErrors.username = "Name required";
//     if (!form.email) newErrors.email = "Email required";
//     if (!form.role) newErrors.role = "Role required";
//     if (!editUser) {
//       if (!form.password) newErrors.password = "Password required";
//       if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length) return setErrors(validationErrors);

//     try {
//       if (editUser) await API.put(`/user/update-data-id/${editUser._id}`, form);
//       else await API.post("/user/user-create", form);
//       setForm({ username: "", email: "", password: "", confirmPassword: "", contact: "", role: "" });
//       setEditUser(null);
//       fetchUsers();
//     } catch (err) { console.log(err); }
//   };

//   return (
//     <form className="form" onSubmit={handleSubmit}>
//       <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
//       <p className="error">{errors.username}</p>

//       <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
//       <p className="error">{errors.email}</p>

//       {!editUser && <>
//         <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
//         <p className="error">{errors.password}</p>

//         <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
//         <p className="error">{errors.confirmPassword}</p>
//       </>}

//       <input placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />

//       <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
//         <option value="">Select Role</option>
//         <option value="seller">Seller</option>
//         <option value="customer">Customer</option>
//       </select>
//       <p className="error">{errors.role}</p>

//       <button type="submit">{editUser ? "Update" : "Add User"}</button>
//     </form>
//   );
// };

// export default UserForm;
import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";

const UserForm = ({ fetchUsers, editUser, setEditUser }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    role: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) setForm({ ...editUser, password: "", confirmPassword: "" });
  }, [editUser]);

  const validate = () => {
    let newErrors = {};
    if (!form.username) newErrors.username = "Name required";
    if (!form.email) newErrors.email = "Email required";
    if (!form.role) newErrors.role = "Role required";
    if (!editUser) {
      if (!form.password) newErrors.password = "Password required";
      if (form.password !== form.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) return setErrors(validationErrors);

    try {
      if (editUser) await API.put(`/user/update-data-id/${editUser._id}`, form);
      else await API.post("/user/user-create", form);

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        contact: "",
        role: "",
      });
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-light">
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <small className="text-danger">{errors.username}</small>
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <small className="text-danger">{errors.email}</small>
        </div>
        <div className="col-md-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <small className="text-danger">{errors.password}</small>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          />
          <small className="text-danger">{errors.confirmPassword}</small>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Contact"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <small className="text-danger">{errors.role}</small>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {editUser ? "Update User" : "Add User"}
      </button>
    </form>
  );
};

export default UserForm;