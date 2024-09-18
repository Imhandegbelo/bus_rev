import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice";
import carReducer from "../feature/cars/carSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cars: carReducer,
  },
});