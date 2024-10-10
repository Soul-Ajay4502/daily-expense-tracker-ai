import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { removeExpense } from "../../redux/slices/expenseSlice";

const ExpenseTable = ({ filter }) => {
    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.expenses);
    const [filteredItems, setFilteredItems] = useState(items);
    const [open, setOpen] = useState(false);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);

    useEffect(() => {
        const now = dayjs();
        let filtered = items;

        if (filter === "day") {
            filtered = items.filter((item) => {
                const itemDate = item.date
                    ? item.date.toDate
                        ? item.date.toDate()
                        : new Date(item.date)
                    : null;

                return itemDate && dayjs(itemDate).isSame(now, "day");
            });
        } else if (filter === "week") {
            filtered = items.filter((item) => {
                const itemDate = item.date
                    ? item.date.toDate
                        ? item.date.toDate()
                        : new Date(item.date)
                    : null;

                return itemDate && dayjs(itemDate).isSame(now, "week");
            });
        } else if (filter === "month") {
            filtered = items.filter((item) => {
                const itemDate = item.date
                    ? item.date.toDate
                        ? item.date.toDate()
                        : new Date(item.date)
                    : null;

                return itemDate && dayjs(itemDate).isSame(now, "month");
            });
        }

        setFilteredItems(filtered);
    }, [filter, items]);

    const handleDeleteClick = (id) => {
        setSelectedExpenseId(id);
        setOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedExpenseId) {
            dispatch(removeExpense(selectedExpenseId));
            setOpen(false);
            setSelectedExpenseId(null);
        }
    };

    const handleDeleteCancel = () => {
        setOpen(false);
        setSelectedExpenseId(null);
    };

    if (status === "loading") {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date (MM-DD-YY)</TableCell>
                            <TableCell>Income Type</TableCell>
                            <TableCell>Income Amount</TableCell>
                            <TableCell>Expense Type</TableCell>
                            <TableCell>Expense Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    {dayjs(
                                        row.date.toDate
                                            ? row.date.toDate()
                                            : new Date(row.date)
                                    ).format("MM/DD/YYYY")}
                                </TableCell>
                                <TableCell>{row.incomeType || "-"}</TableCell>
                                <TableCell>{row.incomeAmount || "-"}</TableCell>
                                <TableCell>{row.expenseType || "-"}</TableCell>
                                <TableCell>
                                    {row.expenseAmount || "-"}
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                            handleDeleteClick(row.id)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredItems.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No records found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this expense? This
                        action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <IconButton onClick={handleDeleteCancel} color="primary">
                        Cancel
                    </IconButton>
                    <IconButton onClick={handleDeleteConfirm} color="secondary">
                        Delete
                    </IconButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ExpenseTable;
