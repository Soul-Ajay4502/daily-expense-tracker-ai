import React, { useState } from "react";
import {
	Button,
	Typography,
	Paper,
	CircularProgress,
	Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	PieChart,
	Pie,
	Cell,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import {
	setReport,
	setExpenseData,
	setIncomeTotal,
	setExpenseTotal,
} from "../../redux/slices/reportSlice";

const Report = () => {
	const { items } = useSelector((state) => state.expenses);
	const dispatch = useDispatch();
	const { reportData, expenseData, incomeTotal, expenseTotal } = useSelector(
		(state) => state.report
	); //report data from Redux
	const [loading, setLoading] = useState(false);

	const generateReport = () => {
		setLoading(true);

		const income = items.reduce(
			(acc, item) => acc + (item.incomeAmount || 0),
			0
		);
		const expenses = items.reduce(
			(acc, item) => acc + (item.expenseAmount || 0),
			0
		);
		const net = income - expenses;

		const expenseCategories = items.reduce((acc, item) => {
			if (item.expenseType) {
				acc[item.expenseType] =
					(acc[item.expenseType] || 0) + (item.expenseAmount || 0);
			}
			return acc;
		}, {});

		const expenseChartData = Object.entries(expenseCategories).map(
			([category, amount]) => ({
				name: category,
				value: amount,
			})
		);

		// array for the report content
		const reportContent = [
			{ label: "Expense ", value: "" },
			{ label: "Total Income", value: `₹${income.toFixed(2)}` },
			{ label: "Total Expenses", value: `₹${expenses.toFixed(2)}` },
			{ label: "Net Savings", value: `₹${net < 0 ? 0 : net.toFixed(2)}` },
			{ label: "Net Loss", value: `₹${net > 0 ? 0 : net.toFixed(2)}` },
			{ label: "Expenses by Category", value: "" },
			...Object.entries(expenseCategories).map(([category, amount]) => ({
				label: category,
				value: `₹${amount.toFixed(2)}`,
			})),
			{ label: "Recommendations", value: "" },
			...(net < 0
				? [
					{
						label: "1. Consider reducing discretionary spending to improve net savings.",
						value: "",
					},
					{
						label: "2. Review recurring expenses and identify potential savings.",
						value: "",
					},
				]
				: [
					{
						label: "1. Maintain current spending habits to sustain savings.",
						value: "",
					},
					{
						label: "2. Consider investing surplus income for better financial growth.",
						value: "",
					},
				]),
		];

		// Dispatch actions to update the Redux store
		dispatch(setReport(reportContent));
		dispatch(setExpenseData(expenseChartData));
		dispatch(setIncomeTotal(income));
		dispatch(setExpenseTotal(expenses));

		setLoading(false);
	};

	return (
		<Paper style={{ padding: "20px", marginTop: "20px" }}>
			<Typography
				variant="h2"
				textAlign="center"
				borderRadius="20px"
				sx={{
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
				}}
			>
				Financial Report
			</Typography>
			<Button
				variant="contained"
				color="primary"
				onClick={generateReport}
				style={{ marginTop: "10px" }}
			>
				Generate Report
			</Button>
			{loading && (
				<Box
					position="fixed"
					top="0"
					left="0"
					width="100%"
					bgcolor="rgba(255, 255, 255, 0.8)"
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="100vh"
				>
					<CircularProgress style={{ marginLeft: "10px" }} />
				</Box>
			)}
			{reportData.length > 0 && (
				<Box style={{ marginTop: "20px" }}>
					<Box
						sx={{
							borderRadius: 1,
							p: 2,
							bgcolor: "#ede8eb",
						}}
					>
						{reportData.map((item, index) => (
							<Typography
								key={index}
								variant="body1"
								style={{
									marginBottom: "10px",
									fontWeight:
										item.value === "" ? "bold" : "normal",
								}}
							>
								{item.label}
								{item.value && `: ${item.value}`}
							</Typography>
						))}
					</Box>
					<h2>Chart Representations</h2>
					<Box
						sx={{
							borderRadius: 1,
							p: 2,
							bgcolor: "#ede8eb",
						}}
					>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart
								data={[
									{
										name: "Total Income",
										value: incomeTotal,
									},
									{
										name: "Total Expenses",
										value: expenseTotal,
									},
								]}
								margin={{
									top: 20,
									right: 30,
									left: 20,
									bottom: 5,
								}}
							>
								<XAxis
									dataKey="name"
									tick={{
										color: "#000",
										fontSize: 14,
										fontWeight: "bold",
										fill: "#4a4a4a",
									}}
								/>
								<YAxis
									tick={{
										color: "#000",
										fontSize: 14,
										fontWeight: "bold",
										fill: "#4a4a4a",
									}}
								/>
								<Tooltip />
								<Bar dataKey="value" fill="#8884d8" />
							</BarChart>
						</ResponsiveContainer>

						<ResponsiveContainer width="100%" height={300}>
							<div style={{ textAlign: "center" }}>
								Expenses by Category
							</div>
							<PieChart>
								<Pie
									data={expenseData}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={80}
									fill="#8884d8"
								>
									{expenseData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={`#${Math.floor(
												Math.random() * 16777215
											).toString(16)}`}
										/>
									))}
								</Pie>
								<Tooltip />
								<Legend />
							</PieChart>
						</ResponsiveContainer>
					</Box>
				</Box>
			)}
		</Paper>
	);
};

export default Report;
