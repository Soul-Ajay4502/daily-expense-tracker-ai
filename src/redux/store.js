// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import expenseReducer from './slices/expenseSlice';
import reportReducer from './slices/reportSlice';
import aiReportReducer from './slices/aiReportSlice';
import openAiReducer from './slices/openAiSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    report:reportReducer,
    aiReport:aiReportReducer,
    openAi: openAiReducer,
  },
});

export default store;
