// src/components/Expenses/ExpenseForm.js
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Grid
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../redux/slices/expenseSlice';
import dayjs from 'dayjs';

const incomeTypes = ['Salary', 'Bonus', 'Investment', 'Rental Income', 'Other'];
const expenseTypes = ['Rent', 'Food', 'Travel', 'Cosmetics', 'Bills', 'Other'];

const ExpenseForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    date: dayjs().format('YYYY-MM-DD'),
    incomeType: '',
    incomeAmount: '',
    expenseType: '',
    expenseAmount: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};
    temp.date = formData.date ? "" : "Date is required.";
    if (formData.incomeAmount) {
      temp.incomeAmount = /^\d+(\.\d{1,2})?$/.test(formData.incomeAmount) ? "" : "Invalid amount.";
    }
    if (formData.expenseAmount) {
      temp.expenseAmount = /^\d+(\.\d{1,2})?$/.test(formData.expenseAmount) ? "" : "Invalid amount.";
    }
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      const expenseData = {
        userId: user.uid,
        date: new Date(formData.date),
        incomeType: formData.incomeType || null,
        incomeAmount: formData.incomeAmount ? parseFloat(formData.incomeAmount) : null,
        expenseType: formData.expenseType || null,
        expenseAmount: formData.expenseAmount ? parseFloat(formData.expenseAmount) : null,
      };
      dispatch(addExpense(expenseData));
      handleClose();
      setFormData({
        date: dayjs().format('YYYY-MM-DD'),
        incomeType: '',
        incomeAmount: '',
        expenseType: '',
        expenseAmount: '',
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Income/Expense</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.date}
              helperText={errors.date}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Income Type"
              name="incomeType"
              value={formData.incomeType}
              onChange={handleChange}
              fullWidth
            >
              {incomeTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Income Amount"
              name="incomeAmount"
              value={formData.incomeAmount}
              onChange={handleChange}
              fullWidth
              error={!!errors.incomeAmount}
              helperText={errors.incomeAmount}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              label="Expense Type"
              name="expenseType"
              value={formData.expenseType}
              onChange={handleChange}
              fullWidth
            >
              {expenseTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Expense Amount"
              name="expenseAmount"
              value={formData.expenseAmount}
              onChange={handleChange}
              fullWidth
              error={!!errors.expenseAmount}
              helperText={errors.expenseAmount}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseForm;
