import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "fetchData",
  async (term: string, thunkAPI) => {
    const response = await axios.get<ItunesSearchResult, any>(
      `${import.meta.env.VITE_API_BASE_URL}/api?term=${term}`
    );
    return response.data.results;
  }
);

export interface ResultsState {
  data: ItunesSearchResultItem[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

const initialState: ResultsState = {
  data: [],
  loading: "idle",
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
};

export const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    incrementPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    reset: (state) => {
      state.data = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = "pending";
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = [...action.payload];
      state.loading = "succeeded";
      state.totalPages = Math.ceil(action.payload.length / state.pageSize);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = "failed";
    });
  },
});

export const { incrementPage, reset } = resultsSlice.actions;

export default resultsSlice.reducer;
