import { postUrls, userUrls } from "../const/routesPath";
import { apiCall } from "./apiCalls";

export const getComments = async (post) => {
  try {
    const resp = await apiCall(
      "get",
      `${postUrls.postsComment}/${post?._id}`,
      {}
    );
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const postComment = async (data) => {
  try {
    const resp = await apiCall("post", postUrls.postsComment, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const patchLike = async (data) => {
  try {
    const resp = await apiCall("patch", postUrls.postsLike, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const patchSave = async (data) => {
  try {
    const resp = await apiCall("patch", postUrls.postsSave, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const getSavedPost = async (data) => {
  try {
    const resp = await apiCall("get", postUrls.postsSave, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const getUserPost = async (data) => {
  try {
    const resp = await apiCall("get", postUrls.posts, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const patchPassword = async (userDetails, data) => {
  try {
    const resp = await apiCall(
      "patch",
      `${userUrls.usersChangePass}/${userDetails.username}`,
      data
    );
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const getUserByUsername = async (data) => {
  try {
    const resp = await apiCall("get", userUrls.users, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const patchProfile = async (userDetails, data) => {
  try {
    const resp = await apiCall(
      "patch",
      `${userUrls.usersEditProfile}/${userDetails.username}`,
      data
    );
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const getAllPosts = async () => {
  try {
    const resp = await apiCall("get", postUrls.posts, {});
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const postForgot = async (data) => {
  try {
    const resp = await apiCall("post", userUrls.usersForgot, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const postLogin = async (data) => {
  try {
    const resp = await apiCall("post", userUrls.usersLogin, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const postUpload = async (data) => {
  try {
    const resp = await apiCall("post", postUrls.postsUpload, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const getSinglePost = async (post) => {
  try {
    const resp = await apiCall("get", `${postUrls.posts}/${post?.id}`, {})
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};

export const postRegister = async (data) => {
  try {
    const resp = await apiCall("post", userUrls.usersRegister, data);
    return resp;
  } catch (error) {
    console.error(error);
    return error?.response
  }
};
