import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof UserState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { updateField } = userSlice.actions;

export default userSlice.reducer;
