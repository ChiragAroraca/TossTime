// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APICall } from '../../../utils/Api';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve, reject) => {
        APICall(
          'POST',
          'auth/login',
          { email, password },
          (data) => resolve(data),
          (error) => reject(error)
        );
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({formData,isFormData}, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve, reject) => {
        APICall(
          'POST',
          'auth/register',
          formData,
          (data) => resolve(data),
          (error) => reject(error),
          isFormData
        );
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerUserFacility = createAsyncThunk(
  'user/registerUser',
  async ({ formData, isFormData }, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve, reject) => {
        APICall(
          'POST',
          'auth/register',
          formData,
          data => resolve(data),
          error => reject(error),
          isFormData
        );
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPlayerProfile = createAsyncThunk(
  'user/getPlayerProfile',
  async ({}, { rejectWithValue }) => {
    try {
      const response = await new Promise((resolve, reject) => {
        APICall(
          'GET',
          'auth/user',
          {},
          data => resolve(data),
          error => reject(error),
          false
        );
      });
      console.log(response,'RESPONSE<>')
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);






const userSlice = createSlice({
  name: 'user',
  initialState: {
    role: null,
    id: null,
    name: '',
    positions:[],
    isPitcher:false,
    isCatcher:false,
    velocity:0,
    bio:'',
    availability:[],
    subscriptionStatus:'free',
    facilityMemberships:[],
    skillLevel:'beginner',
    throwingArm:'both',
    velocityTrackingEnabled: false,
    email: '',
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    token: null,
  },
  reducers: {
    clearUser(state) {
      state.data = null;
      state.status = 'idle';
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.role = action.payload.user.role;
        state.id = action.payload.user.id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.velocityTrackingEnabled = action.payload.user.velocityTrackingEnabled;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Login failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.role = action.payload.user.role;
        state.id = action.payload.user.id;
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.velocityTrackingEnabled = action.payload.user.velocityTrackingEnabled;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Login failed';
      })
        .addCase(getPlayerProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPlayerProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.role = action.payload.user.role;
        state.id = action.payload.user.id;
        state.bio=action.payload.user.bio
        state.facilityMemberships=action.payload.user.facilityMemberships
        state.isCatcher=action.payload.user.isCatcher
        state.isPitcher=action.payload.user.isPitcher
        state.positions=action.payload.user.positions
        state.subscriptionStatus=action.payload.user.subscriptionStatus
        state.throwingArm=action.payload.user.throwingArm
        state.skillLevel=action.payload.user.skillLevel
        state.velocity=action.payload.user.velocity
        state.name = action.payload.user.name;
        state.email = action.payload.user.email;
        state.velocityTrackingEnabled = action.payload.user.velocityTrackingEnabled;
      })
      .addCase(getPlayerProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
