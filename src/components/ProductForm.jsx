import React, { useState, useEffect } from "react";
import API from "../api/axios";

const ProductForm = ({ fetchProducts, editProduct, setEditProduct }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    qty: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        price: editProduct.price,
        category: editProduct.category || "",
        description: editProduct.description || "",
        qty: editProduct.qty || "",
      });
    }
  }, [editProduct]);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Product name required";
    if (!form.price) newErrors.price = "Price required";
    else if (isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price";
    if (form.qty && (isNaN(form.qty) || Number(form.qty) < 0))
      newErrors.qty = "Quantity must be 0 or greater";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) return setErrors(validationErrors);

    try {
      if (editProduct) {
        await API.put(`/product/update/${editProduct._id}`, form);
        setEditProduct(null);
      } else {
        await API.post("/product/create", form);
      }
      setForm({ name: "", price: "", category: "", description: "", qty: "" });
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Operation failed");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <p className="error">{errors.name}</p>

      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <p className="error">{errors.price}</p>

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder="Quantity"
        value={form.qty}
        onChange={(e) => setForm({ ...form, qty: e.target.value })}
      />
      <p className="error">{errors.qty}</p>

      <button type="submit">{editProduct ? "Update Product" : "Add Product"}</button>
    </form>
  );
};

export default ProductForm;
