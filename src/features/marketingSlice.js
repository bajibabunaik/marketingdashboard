import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMarketingData = createAsyncThunk(
  "marketing/fetchData",
  async () => {
    const res = await fetch("/data/marketing_dashboard_data.json");
    return await res.json();
  }
);

const marketingSlice = createSlice({
  name: "marketing",
  initialState: {
    data: [],
    loading: false,
    error: null,

    channelFilter: "",
    regionFilter: "",

    page: 1,
    pageSize: 20,
    sortBy: "spend",
    sortDir: "desc"
  },
  reducers: {
    setChannelFilter(state, action) {
      state.channelFilter = action.payload;
      state.page = 1;
    },
    setRegionFilter(state, action) {
      state.regionFilter = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSort(state, action) {
      if (state.sortBy === action.payload) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = action.payload;
        state.sortDir = "asc";
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMarketingData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMarketingData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMarketingData.rejected, (state) => {
      state.loading = false;
      state.error = "failed to load data";
    });
  }
});

export const {
  setChannelFilter,
  setRegionFilter,
  setPage,
  setSort
} = marketingSlice.actions;

export default marketingSlice.reducer;
