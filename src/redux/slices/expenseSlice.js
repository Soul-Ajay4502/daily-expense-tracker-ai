import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    doc,
    deleteDoc,
} from "firebase/firestore";

// Fetch expenses async action
export const fetchExpenses = createAsyncThunk(
    "expenses/fetchExpenses",
    async (userId) => {
        const q = query(
            collection(db, "expenses"),
            where("userId", "==", userId),
            orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);

        const expenses = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const date = new Date(data.date.seconds * 1000);
            return { id: doc.id, ...data, date };
        });

        return expenses;
    }
);

// Add expense async action
export const addExpense = createAsyncThunk(
    "expenses/addExpense",
    async (expense) => {
        try {
            const docRef = await addDoc(collection(db, "expenses"), expense);
            return { id: docRef.id, ...expense };
        } catch (error) {
            console.log("Error on add expense", error);
        }
    }
);

// Remove expense async action
export const removeExpense = createAsyncThunk(
    "expenses/removeExpense",
    async (expenseId) => {
        try {
            await deleteDoc(doc(db, "expenses", expenseId));
            return expenseId;
        } catch (error) {
            console.log("Error on remove expense", error);
        }
    }
);

const expenseSlice = createSlice({
    name: "expenses",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExpenses.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchExpenses.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchExpenses.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addExpense.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(removeExpense.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (expense) => expense.id !== action.payload
                );
            });
    },
});

export default expenseSlice.reducer;
