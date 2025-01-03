import axios from "axios";
import { addTokenToHeader, handleApiResponse } from "../helper/index";

export const register = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user/register`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    console.log(e);
    return handleApiResponse(e);
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return handleApiResponse(error);
  }
};

export const getUserData = async () => {
  const headers = addTokenToHeader({ headers: {} });
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user`,
      {
        headers,
      }
    );
    return res;
    // return handleApiResponse(res);
  } catch (e) {
    console.log(e);
    return handleApiResponse(e);
  }
};

export const updateUser = async (data) => {
  try {
    const headers = addTokenToHeader({ headers: {} });
    if (!localStorage.getItem("token")) {
      alert("no token");
    }

    const res = axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user`,
      data,
      {
        headers,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return handleApiResponse(error);
  }
};
