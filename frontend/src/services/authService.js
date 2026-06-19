import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const backendAPI = import.meta.env.VITE_BACKEND_API;

export const suggestUsernames = async (fullname) => {
  const response = await axios.post(`${backendAPI}suggest-usernames`, {
    fullname,
  });
  return response.data;
};

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
      { email, password },
      { withCredentials: true },
    );
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

export const createNote = async (formData) => {
  try {
    const response = await axios.post(`${backendAPI}notes`, formData, {
      withCredentials: true,
    });
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
    console.log(response.data);
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${backendAPI}notes/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw error;
  }
};
