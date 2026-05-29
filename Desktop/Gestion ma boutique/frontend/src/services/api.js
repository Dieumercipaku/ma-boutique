import axios from "axios";

const API = axios.create({
  baseURL: "https://ma-boutique-npcs.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;