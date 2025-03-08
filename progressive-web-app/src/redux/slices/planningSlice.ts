import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as XLSX from "xlsx";

interface PlanningData {
  Store: string;
  SKU: string;
  Week: string;
  SalesUnits: number;
  SalesDollars: number;
  GMDollars: number;
  GMPercent: number;
}

interface PlanningState {
  data: PlanningData[];
  status: "idle" | "loading" | "failed";
}

const initialState: PlanningState = {
  data: JSON.parse(localStorage.getItem("planningData") || "[]"),
  status: "idle",
};

export const fetchPlanningData = createAsyncThunk(
  "planning/fetchPlanningData",
  async () => {
    const response = await fetch("../../../public/GSIV25 - Sample Data.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = workbook.SheetNames[4];
    const sheet = workbook.Sheets[sheetName];
    const planningData = XLSX.utils.sheet_to_json<PlanningData>(sheet);

    localStorage.setItem("planningData", JSON.stringify(planningData));
    return planningData;
  }
);

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanningData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlanningData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(fetchPlanningData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default planningSlice.reducer;
