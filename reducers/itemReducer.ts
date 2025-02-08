import IItem from "../models/IItem";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const initialState: IItem[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/item",
});

export const getAllItems = createAsyncThunk("item/getItems", async () => {
    try {
        const response = await api.get("/view");
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const saveItem = createAsyncThunk(
    "item/saveItem",
    async (item: IItem) => {
        try {
            const response = await api.post("/add", item);
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    }
);

export const updateItem = createAsyncThunk(
    "item/updateItem",
    async (payload: { name: string; item: IItem }) => {
        try {
            const response = await api.put(`/update/${payload.name}`, payload.item);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteItem = createAsyncThunk(
    "item/deleteItem",
    async (name: string) => {
        try {
            const response = await api.delete(`/delete/${name}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        addItem(state, action) {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveItem.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveItem.rejected, (state, action) => {
                console.error("Failed to save item", action.payload);
            })
            .addCase(saveItem.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.findIndex(item => item.name === action.payload.name);
                if(index !== -1){
                    state[index] = action.payload;
                }
            })
            .addCase(updateItem.rejected, (state, action) => {
                console.error("Failed to update item", action.payload);
            })
            .addCase(updateItem.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(deleteItem.fulfilled, (state, action) => {
                return state.filter(
                    (item: IItem) => item.name !== action.payload.name
                );
            })
            .addCase(deleteItem.rejected, (state, action) => {
                console.error("Failed to delete Item", action.payload);
            })
            .addCase(deleteItem.pending, (state, action) => {
                console.error("Pending delete item");
            });
        builder
            .addCase(getAllItems.fulfilled, (state, action) => {
                action.payload.map((item: IItem) => {
                    state.push(item);
                });
            })
            .addCase(getAllItems.rejected, (state, action) => {
                console.error("Failed to load item data", action.payload);
            })
            .addCase(getAllItems.pending, (state, action) => {
                console.error("Pending load items");
            });
    },
});

export const { addItem } = itemSlice.actions;
export default itemSlice.reducer;