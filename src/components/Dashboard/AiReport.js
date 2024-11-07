import React, { useState } from "react";
import {
    Button,
    Typography,
    Paper,
    CircularProgress,
    Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
    setAiReport,
    setAiIncomeTotal,
    setAiExpenseTotal,
    setHasRisk,
} from "../../redux/slices/aiReportSlice";
import * as tf from "@tensorflow/tfjs";

const AiReport = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.expenses);

    const { aiReportData, hasRisk } = useSelector((state) => state.aiReport);

    const [report, setReport] = useState("");
    const [loading, setLoading] = useState(false);

    const prepareData = (items) => {
        const incomeTotal = items.reduce(
            (acc, item) => acc + (item?.incomeAmount || 0),
            0
        );
        const expenseTotal = items.reduce(
            (acc, item) => acc + (item?.expenseAmount || 0),
            0
        );
        const netSavings = incomeTotal - expenseTotal;

        const expenseCategories = items.reduce((acc, item) => {
            if (item?.expenseType) {
                acc[item?.expenseType] =
                    (acc[item?.expenseType] || 0) + (item?.expenseAmount || 0);
            }
            return acc;
        }, {});

        return {
            incomeTotal,
            expenseTotal,
            netSavings,
            expenseCategories,
        };
    };

    const createModel = () => {
        const model = tf.sequential();

        model.add(
            tf.layers.dense({ inputShape: [2], units: 16, activation: "relu" })
        );
        model.add(tf.layers.dense({ units: 8, activation: "relu" }));
        model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

        model.compile({
            optimizer: "adam",
            loss: "binaryCrossentropy",
            metrics: ["accuracy"],
        });
        return model;
    };

    const trainModel = async (model, data) => {
        const { incomeTotal, expenseTotal } = data;

        const xs = tf.tensor2d([[incomeTotal, expenseTotal]]);
        const ys = tf.tensor2d([[0.5]]); // Example target

        await model.fit(xs, ys, {
            epochs: 100,
            batchSize: 1,
        });

        return model;
    };

    const generateFinancialReport = async (items) => {
        const data = prepareData(items);
        const model = createModel();

        await trainModel(model, data);

        const prediction = model
            .predict(tf.tensor2d([[data.incomeTotal, data.expenseTotal]]))
            .arraySync();

        // Based on the prediction, generate the report
        dispatch(setHasRisk(data.netSavings < 0));
        return `Net Savings Prediction: ${
            data.netSavings > 0 ? "Positive" : "Negative"
        } \n
      Your estimated savings trend is: ${
          prediction[0][0] > 0.5 ? "Favorable" : "Needs Improvement"
      }.\n
      Consider reviewing your expenses in categories such as ${Object.keys(
          data.expenseCategories
      ).join(", ")}.`;
    };

    const generateReport = async () => {
        setLoading(true);

        try {
            const generatedReport = await generateFinancialReport(items);
            setReport(generatedReport);

            // Calculate income, expenses, and net
            const income = items.reduce(
                (acc, item) => acc + (item?.incomeAmount || 0),
                0
            );
            const expenses = items.reduce(
                (acc, item) => acc + (item?.expenseAmount || 0),
                0
            );
            const net = income - expenses;

            // Categorize expenses
            const expenseCategories = items.reduce((acc, item) => {
                if (item?.expenseType) {
                    acc[item?.expenseType] =
                        (acc[item?.expenseType] || 0) +
                        (item?.expenseAmount || 0);
                }
                return acc;
            }, {});

            // Prepare report content
            const reportContent = [
                { label: "Expense ", value: "" },
                { label: "Total Income", value: `₹${income.toFixed(2)}` },
                { label: "Total Expenses", value: `₹${expenses.toFixed(2)}` },
                {
                    label: "Net Savings",
                    value: `₹${net < 0 ? 0 : net.toFixed(2)}`,
                },
                {
                    label: "Net Loss",
                    value: `₹${net > 0 ? 0 : net.toFixed(2)}`,
                },
                { label: "Expenses by Category", value: "" },
                ...Object.entries(expenseCategories).map(
                    ([category, amount]) => ({
                        label: category,
                        value: `₹${amount.toFixed(2)}`,
                    })
                ),
            ];

            // Dispatch actions to update the Redux store
            dispatch(
                setAiReport({ report: generatedReport, content: reportContent })
            ); // Pass an object
            dispatch(setAiIncomeTotal(income)); // Pass the latest income total
            dispatch(setAiExpenseTotal(expenses)); // Pass the latest expense total
        } catch (error) {
            console.error("Error generating report:", error);
            setReport("Failed to generate report. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            style={{
                padding: "20px",
                marginTop: "20px",
                // background: hasRisk === null ? 'white' : hasRisk ? 'red' : 'green'
            }}
        >
            <Typography
                variant="h2"
                textAlign="center"
                borderRadius="20px"
                sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
            >
                AI-Powered Financial Report
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={generateReport}
                style={{ marginTop: "10px" }}
            >
                Generate AI Report
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
            {report && (
                <Box
                    variant="h6"
                    bgcolor={
                        hasRisk === null
                            ? "white"
                            : hasRisk
                            ? "#f5252f"
                            : "#28de4f"
                    }
                    position={"relative"}
                    sx={{
                        borderRadius: 1,
                        px: 4,
                        py: 8,
                        overflow: "hidden",
                        whiteSpace: "pre-line",
                        mt: 2,
                    }}
                >
                    {report}
                </Box>
            )}
            {aiReportData.report?.length > 0 && (
                <Typography variant="body2" style={{ marginTop: "20px" }}>
                    {!report ? "Last Generated Report" : "Generated Report"}
                    <Box
                        sx={{
                            borderRadius: 1,
                            p: 2,
                            bgcolor:
                                hasRisk === null
                                    ? "white"
                                    : hasRisk
                                    ? "#f5252f"
                                    : "#28de4f",
                        }}
                    >
                        {hasRisk !== null && (
                            <Typography variant="h4" textAlign="center">
                                {hasRisk ? "Need Attension" : "Good"}
                            </Typography>
                        )}
                        {aiReportData.content.map((item, index) => (
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

                        {!report && (
                            <Box
                                variant="h6"
                                bgcolor={"#58b9ed"}
                                position={"relative"}
                                sx={{
                                    borderRadius: 1,
                                    px: 2,
                                    py: 8,
                                    overflow: "hidden",
                                    whiteSpace: "pre-line",
                                }}
                            >
                                <Box
                                    position={"absolute"}
                                    variant="h6"
                                    bgcolor={"violet"}
                                    sx={{
                                        left: "-5px",
                                        top: "20px",
                                        borderRadius: 2,
                                        px: 2,
                                        width: "120px",
                                        py: "4px",
                                    }}
                                >
                                    Model Suggestion
                                </Box>

                                {aiReportData?.report}
                            </Box>
                        )}
                    </Box>
                </Typography>
            )}
        </Paper>
    );
};

export default AiReport;
