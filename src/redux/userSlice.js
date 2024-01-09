import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginApi, currentRestaurant } from "../api/Api";

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: null,
  isSuccessful: false,
};

export const storeToken = (token) => {
  try {
    localStorage.setItem("token", token);
  } catch (err) {
    console.log("Error storing token:", err);
  }
};

// Retrieve the token from local storage
export const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (err) {
    console.log("Error getting token:", err);
    return null;
  }
};

// Remove the token from local storage
export const removeToken = () => {
  try {
    localStorage.removeItem("token");
  } catch (err) {
    console.log("Error removing token:", err);
  }
};

// Create a thunk to handle the login request
export const login = createAsyncThunk("/sign-in", async (data, thunkAPI) => {
  try {
    const response = await LoginApi(data);
    storeToken(response.token);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// create a thunk to handle the logout request
export const logout = createAsyncThunk("/logout", async () => {
  removeToken();
  localStorage.removeItem("restaurant");
  window.location.href = "/login";
});


const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isSuccessful = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isSuccessful = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

// export const { } = userSlice.actions;
export default userSlice.reducer;
