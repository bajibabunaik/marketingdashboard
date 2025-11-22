import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAnalyticsData = createAsyncThunk(
  "analytics/fetchData",
  async () => {
    const res = await fetch("/data/analytics_results_data.json");
    const json = await res.json();
    return json;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, a) => {
        state.loading = false;
        state.data = a.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load analytics";
      });
  }
});

export default analyticsSlice.reducer;
