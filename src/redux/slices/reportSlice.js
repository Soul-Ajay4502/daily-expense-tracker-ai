import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name: "report",
    initialState: {
        reportData: [],
        expenseData: [],
        incomeTotal: 0,
        expenseTotal: 0,
    },
    reducers: {
        setReport: (state, action) => {
            state.reportData = action.payload;
        },
        setExpenseData: (state, action) => {
            state.expenseData = action.payload;
        },
        setIncomeTotal: (state, action) => {
            state.incomeTotal = action.payload;
        },
        setExpenseTotal: (state, action) => {
            state.expenseTotal = action.payload;
        },
        clearReportData: (state) => {
            // Reset the state
            state.reportData = [];
            state.expenseData = [];
            state.incomeTotal = 0;
            state.expenseTotal = 0;
        },
    },
});

export const {
    setReport,
    setExpenseData,
    setIncomeTotal,
    setExpenseTotal,
    clearReportData,
} = reportSlice.actions;

export default reportSlice.reducer;
