import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

export const loginFn = async (values) => {
  const response = await axios.post("/login", values);
  return response;
};
