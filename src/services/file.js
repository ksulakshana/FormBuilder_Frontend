import axios from "axios";
import { addTokenToHeader, handleApiResponse } from "../helper/index";

export const createForm = async (data) => {
  const headers = addTokenToHeader({ headers: {} });

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/form/createForm`,
      data,
      {
        headers,
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(e);
  }
};

export const getAllForms = async (folderId) => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/folder/form/${folderId}`,
      {
        headers,
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(e);
  }
};

export const getFormData = async (formId) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/form/${formId}`,
      {
        headers: {},
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(e);
  }
};
export const deleteForm = async (id) => {
  const headers = addTokenToHeader({ headers: {} });
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/form/${id}`,
      {
        headers,
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(res);
  }
};
