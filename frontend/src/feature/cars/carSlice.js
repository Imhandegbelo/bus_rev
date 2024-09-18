import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carServices from "./carServices";

const initialState = {
  cars: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Create a car
export const createCar = createAsyncThunk(
  "car/create",
  async (goalData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await carServices.addCar(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get cars
export const getCars = createAsyncThunk("car/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await carServices.getCars(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete a goal
export const deleteCar = createAsyncThunk(
  "car/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carServices.removeCar(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit a goal
export const editCar = createAsyncThunk("car/edit", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await carServices.editCar(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    // alternative
    // We didnt do it in users because users persist
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars.push(action.payload);
      })
      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(editCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCar.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editCar.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = state.cars.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = carSlice.actions;
export default carSlice.reducer;
