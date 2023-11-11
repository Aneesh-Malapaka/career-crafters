import { createSlice } from "@reduxjs/toolkit";
import { db } from "../config/firebase-config";

import { getDocs, collection } from "firebase/firestore";

const courseSlice = createSlice({
  name: "courses",
  initialState: [],
  reducers: {
    setCourses: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCourses } = courseSlice.actions;

export const fetchCourses = () => async (dispatch) => {
  const courseCollectionRef = collection(db, "courses");
  const querySnapshot = await getDocs(courseCollectionRef);
  const courses = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  dispatch(setCourses(courses));
};

export default courseSlice.reducer;
