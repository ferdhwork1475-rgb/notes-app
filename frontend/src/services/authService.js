import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
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
    const response = await axios.post(`${backendAPI}register`, formData);
    return response.data;
  } catch (error) {
    const backendError = error.response?.data?.error;
    const message = error.response?.data?.message || "Registration failed";

    if (Array.isArray(backendError)) {
      backendError.forEach((err) => toast.error(err));
    } else {
      toast.error(message);
    }

    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${backendAPI}login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    const backendError = error.response?.data?.error;
    const message = error.response?.data?.message || "Login failed";

    if (Array.isArray(backendError)) {
      backendError.forEach((err) => toast.error(err));
    } else {
      toast.error(message);
    }

    throw error;
  }
};

export const verifyUser = async () => {
  try {
    const response = await axios.get(`${backendAPI}protected/login`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findUserDetails = async () => {
  try {
    const response = await axios.get(`${backendAPI}protected/login`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Login again!");

    throw error;
  }
};

export const createNote = async (title, tags, content) => {
  try {
    await axios.post(
      `${backendAPI}protected/notes`,
      { title, tags, content },
      { withCredentials: true },
    );
    toast.success("Note added successfully");
  } catch (error) {
    console.log(error)
    toast.error("An error occured while creating your note.");

    throw error;
  }
};
