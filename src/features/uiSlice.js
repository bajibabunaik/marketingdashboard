import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUiTokens = createAsyncThunk(
  "ui/fetchTokens",
  async () => {
    const res = await fetch("/data/ui_design_system_data.json");
    const json = await res.json();
    return json;
  }
);

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    tokens: [],
    loading: false,
  },
  extraReducers: (b) => {
    b.addCase(fetchUiTokens.fulfilled, (s, a) => {
      s.tokens = a.payload;
    });
  }
});

export default uiSlice.reducer;
