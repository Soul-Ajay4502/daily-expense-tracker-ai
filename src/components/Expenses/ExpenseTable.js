import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const ExpenseTable = ({ filter }) => {
  const { items, status } = useSelector((state) => state.expenses);
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    const now = dayjs();
    let filtered = items;

    if (filter === 'day') {
      filtered = items.filter(item => {
        const itemDate = item.date ? 
          (item.date.toDate ? item.date.toDate() : new Date(item.date)) : 
          null;
          
        return itemDate && dayjs(itemDate).isSame(now, 'day');
      });
    } else if (filter === 'week') {
      filtered = items.filter(item => {
        const itemDate = item.date ? 
          (item.date.toDate ? item.date.toDate() : new Date(item.date)) : 
          null;
          
        return itemDate && dayjs(itemDate).isSame(now, 'week');
      });
    } else if (filter === 'month') {
      filtered = items.filter(item => {
        const itemDate = item.date ? 
          (item.date.toDate ? item.date.toDate() : new Date(item.date)) : 
          null;
          
        return itemDate && dayjs(itemDate).isSame(now, 'month');
      });
    }

    setFilteredItems(filtered);
  }, [filter, items]);

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  return (
    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Income Type</TableCell>
            <TableCell>Income Amount</TableCell>
            <TableCell>Expense Type</TableCell>
            <TableCell>Expense Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{dayjs(row.date.toDate ? row.date.toDate() : new Date(row.date)).format('MM/DD/YYYY')}</TableCell>
              <TableCell>{row.incomeType || '-'}</TableCell>
              <TableCell>{row.incomeAmount || '-'}</TableCell>
              <TableCell>{row.expenseType || '-'}</TableCell>
              <TableCell>{row.expenseAmount || '-'}</TableCell>
            </TableRow>
          ))}
          {filteredItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No records found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseTable;
