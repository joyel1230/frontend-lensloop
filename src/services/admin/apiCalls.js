import { adminApi } from "./api";

export const adminApiCall = async (method, url, data) => {
  let response;
  if (method === "post") {
    response = await adminApi.post(url, data);
  } else if (method === "get") {
    response = await adminApi.get(url, data);
  } else if (method === "patch") {
    response = await adminApi.patch(url, data);
  }
  return response;
};
