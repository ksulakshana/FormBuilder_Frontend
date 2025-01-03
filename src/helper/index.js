import { decodeToken } from "react-jwt";

export function addTokenToHeader({ headers }) {
  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `${token}`;
  }
  return headers;
}

export function handleApiResponse(res) {
  switch (res.status) {
    case 401:
      localStorage.removeItem("token");
      window.location.href = "/login";
      return null;
    case 400:
      return res;
    case 201:
      return res;
    case 200:
      return res;
    case 500:
      alert("Something went wrong");
      return res;
    default:
      alert("Something went wrong");
      break;
  }
}
