import axios from "axios";

const API = axios.create({
  baseURL: "https://product-server-1-vvtn.onrender.com", 
  withCredentials: true, 
});


export default API;
