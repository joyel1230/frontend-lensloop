import { adminUrls, adsUrls, postUrls } from "../../const/routesPath";
import { adminApiCall } from "./apiCalls";

export const getPosts = async () => {
  try {
    const resp = await adminApiCall("get", postUrls.posts, {
      params: { userId: "admin" },
    });
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (data) => {
  try {
    const resp = await adminApiCall("patch", `${postUrls.postsDelete}`, data);
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    const resp = await adminApiCall("get", adminUrls.adminUsers);
    return resp;
  } catch (error) {
    console.error(error);
  }
};

export const patchUser = async (username, data) => {
  try {
    const resp = await adminApiCall(
      "patch",
      `${adminUrls.adminUsersStatus}/${username}`,
      data
    );
    return resp
  } catch (error) {
    console.error(error);
  }
};

export const postLogin = async (data) => {
  try {
    const resp = await adminApiCall(
      "post",
      adminUrls.adminLogin,
      data
    );
    return resp
  } catch (error) {
    console.error(error);
  }
};

export const getReports = async () => {
  try {
    const resp = await adminApiCall(
      "get",
      adminUrls.adminPostsReport,
    );
    return resp
  } catch (error) {
    console.error(error);
  }
};

export const patchAd = async (data) => {
  try {
    const resp = await adminApiCall("patch",adsUrls.adsDelete,data)
    return resp
  } catch (error) {
    console.error(error);
  }
};
