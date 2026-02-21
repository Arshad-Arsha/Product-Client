import React, { useState, useEffect, useContext } from "react";
import API from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const Products = () => {
  const { user } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    qty: ""
  });

  
  const canModify = user?.role === "seller" || user?.role === "admin";

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product/get");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const productExists = products.find(
      (p) =>
        p.name.toLowerCase() === formData.name.toLowerCase() &&
        p._id !== editId
    );

    if (productExists) {
      return setError("Validation Error: This product name is already created.");
    }

    try {
      if (editId) {
        await API.put(`/product/update/${editId}`, formData);
      } else {
        await API.post("/product/create", formData);
      }

      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        qty: ""
      });

      setShowForm(false);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      setError("Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      qty: product.qty
    });
    setEditId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await API.delete(`/product/delete/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="page-container">
      <div className="header-flex">
        <h1>Products</h1>

        {canModify && (
          <button
            className="btn primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditId(null);
              setFormData({
                name: "",
                price: "",
                category: "",
                description: "",
                qty: ""
              });
            }}
          >
            {showForm ? "Cancel" : "Add New Product"}
          </button>
        )}
      </div>

      {showForm && canModify && (
        <form onSubmit={handleSubmit} className="product-form card">
          <h3>{editId ? "Edit Product" : "Add Product"}</h3>
          {error && <div className="error-msg">{error}</div>}

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="qty"
            placeholder="Quantity"
            value={formData.qty}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="btn success">
            {editId ? "Update" : "Save"}
          </button>
        </form>
      )}

      <div className="product-grid">
        {products.length > 0 ? (
          products.map((prod) => (
            <div key={prod._id} className="card product-card">
              <h3>{prod.name}</h3>
              <p className="price">₹{prod.price}</p>
              <p><strong>Category:</strong> {prod.category}</p>
              <p><strong>Qty:</strong> {prod.qty}</p>
              <p className="desc">{prod.description}</p>

              {canModify && (
                <div className="action-btns">
                  <button
                    onClick={() => handleEdit(prod)}
                    className="btn secondary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="btn danger"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
