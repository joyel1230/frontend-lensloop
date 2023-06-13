import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reduxSlices/theme";

const store = configureStore({
    reducer:{
        theme: themeSlice
    }
});

export default store;
