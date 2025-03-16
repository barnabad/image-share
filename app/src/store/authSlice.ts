import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    loginUser: (
      state,
      action: PayloadAction<{ accessToken: string; userId: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
    },

    logoutUser: (state) => {
      state.accessToken = null;
      state.userId = null;
    },
  },
});

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export const selectUserId = (state: RootState) => state.auth.userId;

export const { setAccessToken, loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
