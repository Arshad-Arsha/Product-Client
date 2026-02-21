import axios from "axios";

const API = axios.create({
  baseURL: "https://product-server-1-vvtn.onrender.com", 
  withCredentials: true, // IMPORTANT: Allows cookies (JWT) to be sent automatically
});

export default API;