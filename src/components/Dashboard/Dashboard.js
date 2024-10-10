import React, { useEffect, useState } from 'react';
import { Container, Grid, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ExpenseTable from '../Expenses/ExpenseTable';
import ExpenseForm from '../Expenses/ExpenseForm';
import Report from './Report';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../../redux/slices/expenseSlice';
import AiReport from './AiReport';
import ReportTabs from '../ReportTabs';
import Footer from '../shared/Footer';
import OpenAiReport from './openAiReport';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { items, status } = useSelector((state) => state.expenses);
    const [openForm, setOpenForm] = useState(false);
    const [filter, setFilter] = useState('all'); // all, day, week, month

    useEffect(() => {

        if (user) {
            dispatch(fetchExpenses(user.uid));
        }
    }, [dispatch, user]);

    const handleAddClick = () => {
        setOpenForm(true);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <>
        <Container maxWidth="lg" style={{ marginTop: '20px',marginBottom:'20px',minHeight:'90vh' }}>
            <Grid container spacing={3} style={{ paddingTop: '14%' }}>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddClick}>
                        Add Income/Expense
                    </Button>
                    <FormControl size="small" style={{ marginLeft: '20px', minWidth: 120 }}>
                        <InputLabel id="filter-label">Filter</InputLabel>
                        <Select
                            labelId="filter-label"
                            value={filter}
                            label="Filter"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="day">Day(Today)</MenuItem>
                            <MenuItem value="week">Week(This Week)</MenuItem>
                            <MenuItem value="month">Month(This Month)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <ExpenseTable filter={filter} />
                </Grid>
                {items.length > 0 &&
                    <Grid item xs={12}>
                        <ReportTabs
                            Report={Report}
                            AiReport={AiReport} 
                            OpenAiReport={OpenAiReport}/>
                    </Grid>
                }
            </Grid>
            <ExpenseForm open={openForm} handleClose={() => setOpenForm(false)} />
        </Container>
        <Footer/>
        </>
    );
};

export default Dashboard;
