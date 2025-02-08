import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducers/customerReducer";
import itemReducer from "../reducers/itemReducer";

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        item: itemReducer
    },
});

export type AppDispatch = typeof store.dispatch;