import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../redux/slices/expenseSlice";
import dayjs from "dayjs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const incomeTypes = ["Salary", "Bonus", "Investment", "Rental Income", "Other"];
const expenseTypes = ["Rent", "Food", "Travel", "Cosmetics", "Bills", "Other"];

const ExpenseForm = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        date: Yup.date().required("Date is required."),
        incomeType: Yup.string().required("Income type is required."),
        incomeAmount: Yup.number()
            .required()
            .typeError("Must be a number.")
            .positive("Amount must be positive.")
            .max(999999999, "Amount too large."),
        expenseType: Yup.string().required("Expense type is required."),
        expenseAmount: Yup.number()
            .required("Expense amount is required.")
            .typeError("Must be a number.")
            .positive("Amount must be positive.")
            .max(999999999, "Amount too large."),
    });

    const initialValues = {
        date: dayjs().format("YYYY-MM-DD"),
        incomeType: "",
        incomeAmount: "",
        expenseType: "",
        expenseAmount: "",
    };

    const handleSubmit = (values, { resetForm }) => {
        const expenseData = {
            userId: user.uid,
            date: new Date(values.date),
            incomeType: values?.incomeType,
            incomeAmount: values?.incomeAmount
                ? parseFloat(values?.incomeAmount)
                : 0,
            expenseType: values?.expenseType || null,
            expenseAmount: values?.expenseAmount
                ? parseFloat(values?.expenseAmount)
                : 0,
        };
        dispatch(addExpense(expenseData));
        handleClose();
        resetForm();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Income/Expense</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleChange,
                        setFieldValue,
                        values,
                        errors,
                        touched,
                    }) => (
                        <Form>
                            <Grid
                                container
                                spacing={2}
                                style={{ marginTop: "10px" }}
                            >
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        label="Date"
                                        type="date"
                                        name="date"
                                        fullWidth
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={touched.date && !!errors.date}
                                        helperText={
                                            touched.date && (
                                                <ErrorMessage name="date" />
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        select
                                        label="Income Type"
                                        name="incomeType"
                                        fullWidth
                                        onChange={handleChange}
                                        helperText={
                                            touched?.incomeType && (
                                                <ErrorMessage name="incomeType" />
                                            )
                                        }
                                    >
                                        {incomeTypes.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        label="Income Amount"
                                        name="incomeAmount"
                                        fullWidth
                                        error={
                                            touched?.incomeAmount &&
                                            !!errors?.incomeAmount
                                        }
                                        helperText={
                                            touched?.incomeAmount && (
                                                <ErrorMessage name="incomeAmount" />
                                            )
                                        }
                                        disabled={!values?.incomeType}
                                        title={
                                            !values?.incomeType
                                                ? "Select any Income Type"
                                                : ""
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        select
                                        label="Expense Type"
                                        name="expenseType"
                                        fullWidth
                                        onChange={handleChange}
                                        helperText={
                                            touched?.expenseType && (
                                                <ErrorMessage name="expenseType" />
                                            )
                                        }
                                    >
                                        {expenseTypes.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        as={TextField}
                                        label="Expense Amount"
                                        name="expenseAmount"
                                        fullWidth
                                        error={
                                            touched?.expenseAmount &&
                                            !!errors?.expenseAmount
                                        }
                                        helperText={
                                            touched?.expenseAmount && (
                                                <ErrorMessage name="expenseAmount" />
                                            )
                                        }
                                        disabled={!values?.expenseType}
                                        title={
                                            !values?.expenseType
                                                ? "Select any Expense Type"
                                                : ""
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <DialogActions>
                                <Button onClick={handleClose} color="secondary">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                >
                                    Add
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default ExpenseForm;
