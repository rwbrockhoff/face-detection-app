import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { faceDetectionAPI } from '../../api/axios';

const initialState = {
  isAuthenticated: false,
  user: { id: '', name: '', email: '', entries: 0 },
};

export const registerUser = createAsyncThunk(
  'registerUser',
  async (formData) => {
    const { name, email, password } = formData;
    //TO DO form validation
    const response = await faceDetectionAPI.post('/register', {
      name,
      email,
      password,
    });
    return await response;
  }
);

export const signInUser = createAsyncThunk('signInUser', async (formData) => {
  const { email, password } = formData;
  const response = await faceDetectionAPI.post('/signin', { email, password });
  return await response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOutUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      const { user } = action.payload.data;
      state.user = user;
      state.isAuthenticated = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      const { user } = action.payload.data;
      state.user = user;
      state.isAuthenticated = true;
    });
  },
});

export const { signOutUser } = authSlice.actions;
export default authSlice.reducer;
