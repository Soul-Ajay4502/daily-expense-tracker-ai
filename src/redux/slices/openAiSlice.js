// src/redux/slices/openAiSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  aiResponse: '',
  loading: false,
  error: null,
};

const openAiSlice = createSlice({
  name: 'openAi',
  initialState,
  reducers: {
    setAiResponse: (state, action) => {
      state.aiResponse = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearOpenAiData: (state) => {
      state.aiResponse = '';
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setAiResponse, setLoading, setError, clearOpenAiData } = openAiSlice.actions;

export default openAiSlice.reducer;
