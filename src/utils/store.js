import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reduxSlices/theme";
import userSlice from "./reduxSlices/user";
import adminSlice from "./reduxSlices/admin";

const store = configureStore({
    reducer:{
        theme: themeSlice,
        user: userSlice,
        admin: adminSlice
    }
});

export default store;
