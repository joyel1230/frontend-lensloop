import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reduxSlices/theme";
import userSlice from "./reduxSlices/user";
import adminSlice from "./reduxSlices/admin";
import userPostSlice from "./reduxSlices/userPost";

const store = configureStore({
    reducer:{
        theme: themeSlice,
        user: userSlice,
        admin: adminSlice,
        userPost: userPostSlice
    }
});

export default store;
