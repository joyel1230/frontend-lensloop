import { createSlice } from "@reduxjs/toolkit";
const userPostSlice = createSlice({
  name: "userPost",
  initialState: {
    userPostsArray: [],
  },
  reducers: {
    setUserPosts: (state, action) => {
      state.userPostsArray = action.payload;
    },
    addUserPosts: (state, action) => {
      state.userPostsArray.push(...action.payload);
    },
  },
});

export const { setUserPosts,addUserPosts } = userPostSlice.actions;

export default userPostSlice.reducer;
