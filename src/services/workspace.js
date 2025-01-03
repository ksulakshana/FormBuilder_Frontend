import axios from "axios";
import { addTokenToHeader, handleApiResponse } from "../helper/index";

export const shareWorkspace = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/workspace/shareWorkspace`,
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
  }
};

export const getUserAllWorkspace = async () => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/workspace`,
      {
        headers,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const getWorkspaceData = async (id) => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/workspace/${id}`,
      {
        headers,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const updateWorkspace = async (id, data) => {
  try {
    const headers = addTokenToHeader({ headers: {} });
    if (!localStorage.getItem("token")) {
      alert("no token");
    }
    const res = axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/v1/workspace/${id}`,
      data,
      {
        headers,
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
