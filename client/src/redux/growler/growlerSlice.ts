import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GrowlType = "info" | "success" | "error" | "warning";

export interface Growl {
  id: number;
  message: string;
  type: GrowlType;
}

interface GrowlState {
  growls: Growl[];
}

const initialState: GrowlState = {
  growls: [],
};

let nextId = 0;

const growlSlice = createSlice({
  name: "growl",
  initialState,
  reducers: {
    addGrowl: (
      state,
      action: PayloadAction<{ message: string; type: GrowlType }>
    ) => {
      state.growls.push({ id: nextId++, ...action.payload });
    },
    removeGrowl: (state, action: PayloadAction<number>) => {
      state.growls = state.growls.filter(
        (growl) => growl.id !== action.payload
      );
    },
  },
});

export const { addGrowl, removeGrowl } = growlSlice.actions;

export default growlSlice.reducer;
