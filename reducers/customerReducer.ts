import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ICustomer from "../models/ICustomer";
import axios from "axios";

export const initialState: ICustomer[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/customer",
});

export const getAllCustomers = createAsyncThunk(
    "customer/getCustomers",
    async () => {
        try {
            const response = await api.get("/view");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const saveCustomer = createAsyncThunk(
    "customer/saveCustomer",
    async (customer: ICustomer) => {
        try {
            const response = await api.post("/add", customer);
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async (payload: { email: string; customer: ICustomer }) => {
        try {
            const response = await api.put(
                `/update/${payload.email}`,
                payload.customer
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (email: string) => {
        try {
            const response = await api.delete(`/delete/${email}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        addCustomer(state, action) {
            state.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.error("Failed to save customer", action.payload);
            })
            .addCase(saveCustomer.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.findIndex(customer => customer.email === action.payload.email);
                if(index !== -1){
                    state[index] = action.payload;
                }
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                console.error("Failed to update customer", action.payload);
            })
            .addCase(updateCustomer.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                return state.filter(
                    (customer: ICustomer) => customer.email !== action.payload.email
                );
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                console.error("Failed to delete customer", action.payload);
            })
            .addCase(deleteCustomer.pending, (state, action) => {
                console.error("Pending");
            });
        builder
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                action.payload.map((customer: ICustomer) => {
                    state.push(customer);
                });
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                console.error("Failed to load customer data", action.payload);
            })
            .addCase(getAllCustomers.pending, (state, action) => {
                console.error("Pending load customers");
            });
    },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
