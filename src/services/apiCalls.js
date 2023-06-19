import { api } from "./api";

export const apiCall = async (method, url, data) => {
  let response;
  if (method === "post") {
    response = await api.post(url, data);
  } else if (method === "get") {
    response = await api.get(url, data);
  }
  return response;
};
