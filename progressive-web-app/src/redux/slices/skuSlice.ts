import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";

interface SKU {
  ID: string;
  Label: string;
  Price: number;
  Cost: number;
}

interface SKUState {
  data: SKU[];
  status: "idle" | "loading" | "failed";
}

const initialState: SKUState = {
  data: [],
  status: "idle",
};

// Async action to load SKU data from the Excel file
export const fetchSKUData = createAsyncThunk("skus/fetchSKUData", async () => {
  const response = await fetch("/GSIV25 - Sample Data.xlsx");
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[1]; // Get SKU sheet
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json<SKU>(sheet);
});

const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addNewSKU: (state, action: PayloadAction<SKU>) => {
      state.data.push(action.payload);
    },
    deleteSKU: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((sku) => sku.ID !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSKUData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSKUData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(fetchSKUData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addNewSKU, deleteSKU } = skuSlice.actions;
export default skuSlice.reducer;
