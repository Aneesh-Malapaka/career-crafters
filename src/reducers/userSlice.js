import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    enrolledCourses: [],
  },
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: (state) => {
      return null;
    },
    setEnrolledCourses: (state, action) => {
      state = {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.payload],
      };
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export const { setEnrolledCourses } = userSlice.actions;

export default userSlice.reducer;
