import axios from "axios";
import { handleApiResponse } from "../helper/index";

export const startUserForm = async (id, data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/userform/startUserForm/${id}`,
      data,
      {
        headers: {},
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(e);
  }
};

export const completeUserForm = async (id, data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/userform/completeUserForm/${id}`,
      data,
      {
        headers: {},
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(e);
  }
};

export const getAllUserForms = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/userform/${id}`,
      {
        headers: {},
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(e);
  }
};

/***********code related to counts************* */

export const addViewCount = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/userformcount/addViewCount`,
      data,
      {
        headers: {},
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    console.log(e);
    return handleApiResponse(e);
  }
};

export const addStartCount = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/userformcount/addStartCount`,
      data,
      {
        headers: {},
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(e);
  }
};

export const addCompleteCount = async (data) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/userformcount/addCompleteCount`,
      data,
      {
        headers: {},
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    console.log(e);
    return handleApiResponse(e);
  }
};

export const getCount = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/v1/userformcount/count/${id}`,
      {
        headers: {},
      }
    );
    return handleApiResponse(res);
  } catch (e) {
    return handleApiResponse(e);
  }
};
