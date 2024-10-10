import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openAiResponse: "",
    loading: false,
    error: null,
};

const openAiSlice = createSlice({
    name: "openAi",
    initialState,
    reducers: {
        setOpenAiResponse: (state, action) => {
            state.openAiResponse = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearOpenAiData: (state) => {
            state.openAiResponse = "";
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setOpenAiResponse, setLoading, setError, clearOpenAiData } =
    openAiSlice.actions;

export default openAiSlice.reducer;
