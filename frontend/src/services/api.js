import axios from "axios";

const API = axios.create({
  baseURL: " https://smart-cash-flow-system.onrender.com/api"
});

export const addTransaction  = (data) => API.post("/add", data);
export const getAll          = ()     => API.get("/all");
export const getBalance      = ()     => API.get("/balance");
export const getTotalIncome  = ()     => API.get("/income");
export const getTotalExpenses= ()     => API.get("/expenses");
export const getForecast     = ()     => API.get("/forecast");
export const getSummary      = ()     => API.get("/summary");
export const deleteTransaction=(id)   => API.delete(`/delete/${id}`);