import { createSlice } from "@reduxjs/toolkit";

// Initial state for AI report
const initialState = {
	aiReportData: [], // AI-generated report
	aiIncomeTotal: 0,
	aiExpenseTotal: 0,
	hasRisk: null,
};

// Create AI-specific slice
const aiReportSlice = createSlice({
	name: "aiReport",
	initialState,
	reducers: {
		setAiReport: (state, action) => {
			state.aiReportData = action.payload;
		},
		setAiIncomeTotal: (state, action) => {
			state.aiIncomeTotal = action.payload;
		},
		setAiExpenseTotal: (state, action) => {
			state.aiExpenseTotal = action.payload;
		},
		setHasRisk: (state, action) => {
			state.hasRisk = action.payload;
		},
		clearAiReportData: (state) => {
			// Reset the state
			state.aiReportData = [];
			state.aiExpenseTotal = 0;
			state.aiIncomeTotal = 0;
			state.hasRisk = null;
		},
	},
});

export const {
	setAiReport,
	setAiIncomeTotal,
	setAiExpenseTotal,
	setHasRisk,
	clearAiReportData,
} = aiReportSlice.actions;
export default aiReportSlice.reducer;
