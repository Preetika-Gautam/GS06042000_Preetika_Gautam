import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";

interface Store {
  ID: string;
  Label: string;
  City: string;
  State: string;
}

interface StoreState {
  data: Store[];
  status: "idle" | "loading" | "failed";
}

const initialState: StoreState = {
  data: JSON.parse(localStorage.getItem("storeData") || "[]"),
  status: "idle",
};

// Async action to load Excel data
export const fetchStoreData = createAsyncThunk(
  "stores/fetchStoreData",
  async (_, { getState }) => {
    const currentState = getState() as { stores: StoreState };

    // If data exists in local storage, return it instead of refetching
    if (currentState.stores.data.length > 0) {
      return currentState.stores.data;
    }

    const response = await fetch("../../../public/GSIV25 - Sample Data.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const stores = XLSX.utils.sheet_to_json<Store>(sheet);

    localStorage.setItem("storeData", JSON.stringify(stores)); // Store fetched data in local storage
    return stores;
  }
);

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addNewStore: (state, action: PayloadAction<Store>) => {
      state.data.push(action.payload);
      localStorage.setItem("storeData", JSON.stringify(state.data)); // Update local storage
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((store) => store.ID !== action.payload);
      localStorage.setItem("storeData", JSON.stringify(state.data)); // Persist deletion
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoreData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStoreData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(fetchStoreData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addNewStore, deleteStore } = storeSlice.actions;
export default storeSlice.reducer;
