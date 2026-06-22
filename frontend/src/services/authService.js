import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const backendAPI = import.meta.env.VITE_BACKEND_API;

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
    console.log(error)
  }
};

export const createNote = async (formData) => {
  try {
    const response = await axios.post(`${backendAPI}notes`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchNotes = async () => {
  try {
    const response = await axios.get(`${backendAPI}notes`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${backendAPI}notes/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (id, formData) => {
  try {
    const response = await axios.put(`${backendAPI}notes/${id}`, formData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${backendAPI}notes/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
