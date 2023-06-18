import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reduxSlices/theme";
import userSlice from "./reduxSlices/user";

const store = configureStore({
    reducer:{
        theme: themeSlice,
        user: userSlice
    }
});

export default store;
