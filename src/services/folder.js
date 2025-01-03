import axios from "axios";
import { addTokenToHeader, handleApiResponse } from "../helper/index";

export const createFolder = async (data) => {
  const headers = addTokenToHeader({ headers: {} });

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/folder/createFolder`,
      data,
      {
        headers,
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    console.log(e);
    return handleApiResponse(e);
  }
};

export const getAllFoldersForWorkspace = async (id) => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/folder/${id}`,
      {
        headers,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFolder = async (id) => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/folder/${id}`,
      {
        headers,
      }
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};
