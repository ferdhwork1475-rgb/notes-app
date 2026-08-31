import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

// const backendAPI = import.meta.env.VITE_BACKEND_API;
const backendAPI = "http://localhost:3000/api/"; // Replace with your backend API URL

export const signupUser = async (formData) => {
  try {
    const response = await axios.post(`${backendAPI}register`, formData);
  } catch (error) {
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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(`${backendAPI}logout`, null, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const verifyUser = async () => {
  try {
    const response = await axios.get(`${backendAPI}user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendOtpRequest = async (email) => {
  try {
    const response = await axios.post(`${backendAPI}forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtpCode = async (email, fullOtpString) => {
  try {
    const response = await axios.post(`${backendAPI}verify-otp`, {
      email,
      fullOtpString, 
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const finalizeResetPasswordApiCall = async (email, token, password) => {
  try {
    const response = await axios.post(`${backendAPI}password-reset`, {
      email,
      token,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
    console.log(error);
  }
};

export const createArticle = async (formData) => {
  try {
    const response = await axios.post(`${backendAPI}articles`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchArticles = async (page, category) => {
  try {
    const response = await axios.get(
      `${backendAPI}articles?page=${page}&category=${category}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchArticle = async (slug) => {
  try {
    const response = await axios.get(`${backendAPI}articles/${slug}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateArticle = async (slug, formData) => {
  try {
    const response = await axios.put(
      `${backendAPI}articles/${slug}`,
      formData,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (slug) => {
  try {
    const response = await axios.delete(`${backendAPI}articles/${slug}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendContactMsg = async (name, email, subject, message) => {
  try {
    const response = await axios.post(
      `${backendAPI}contact`,
      { name, email, subject, message },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
