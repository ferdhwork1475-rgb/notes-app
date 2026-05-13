import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
const backendAPI = import.meta.env.VITE_BACKEND_API_URL;

export const suggestUsernames = async (fullname) => {
  const response = await axios.post(`${backendAPI}suggest-usernames`, {
    fullname,
  });
  return response.data;
};

export const signupUser = async (formData) => {
  try {
    await axios.post(`${backendAPI}register`, formData);
  } catch (error) {
    if (error.response && error.response.data) {
      const backendError = error.response.data.error;
      Array.isArray(backendError) &&
        backendError.map((err) => console.log(err));
    }
  }
};

export const loginUser = async (email, password) => {
  try {
    await axios.post(`${backendAPI}login`, { email, password });
  } catch (error) {
    if (error.response && error.response.data) {
      const backendError = error.response.data.error;
      Array.isArray(backendError)
        ? backendError.map((err) => toast.error(err))
        : toast.error(error.response.data.message);
    }
  }
};

export const verifyUser = async () => {
    try {
      const { setIsLoggedIn } = useContext(AuthContext)
        const response = await axios.get(`${backendAPI}protected/login`);
      console.log(response)
    } catch (error) {
        console.log(error.response.data)
    }
}