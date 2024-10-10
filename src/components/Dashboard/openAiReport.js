import React, { useState } from "react";
import {
    Button,
    Typography,
    Paper,
    CircularProgress,
    Box,
} from "@mui/material";
import { fetchAiResponse } from "../../utils/fetchAiResponse";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAiResponse } from "../../redux/slices/openAiSlice";
import aiImage from "../../assets/images/ai.jpg";
import aiImageWhite from "../../assets/images/ai2.png";

const OpenAiReport = () => {
    const { items } = useSelector((state) => state.expenses);
    const dispatch = useDispatch();

    const [aiResponse, setAiResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { openAiResponse } = useSelector((state) => state.openAi);

    const generateReport = () => {
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

        // Convert report content to text format
        const reportText = `
            I need a financial report based on the following data with your suggestions to improve saving habit please give full details:

            1. **Total Income:** ₹${income.toFixed(2)}
            2. **Total Expenses:** ₹${expenses.toFixed(2)}
            3. **Net Savings:** ₹${net < 0 ? 0 : net.toFixed(2)}
            4. **Net Loss:** ₹${net > 0 ? 0 : net.toFixed(2)}
            5. **Expenses by Category:**
            ${Object.entries(expenseCategories)
                .map(
                    ([category, amount]) =>
                        `   - ${category}: ₹${amount.toFixed(2)}`
                )
                .join("\n")}
            6. **Recommendations:**
            ${
                net < 0
                    ? '   - Consider reducing discretionary spending to improve net savings.\n   - Review recurring expenses and identify potential savings."cut"'
                    : '   - Maintain current spending habits to sustain savings.\n   - Consider investing surplus income for better financial growth."cut" '
            }
        `;

        return reportText;
    };

    const generateAiReport = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetchAiResponse(generateReport());
            const result = response.split('"cut"')[1].trim(); // Gets everything after "cut" because the AI response include the input data too

            setAiResponse(result);
            dispatch(setOpenAiResponse(result));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            style={{
                padding: "20px",
                marginTop: "20px",
                backgroundImage: `url(${aiImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Typography
                variant="h2"
                textAlign="center"
                borderRadius="20px"
                sx={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    backgroundImage: `url(${aiImageWhite})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "4px solid grey",
                }}
            >
                OpenAI-Powered Financial Report
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={generateAiReport}
                disabled={loading}
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
            {aiResponse ? (
                <Box
                    sx={{
                        marginTop: "20px",
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                    }}
                >
                    <Typography variant="h6">AI Suggestions:</Typography>
                    <Typography whiteSpace={"pre-line"}>
                        {aiResponse}
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        marginTop: "20px",
                        padding: "10px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                    }}
                >
                    {openAiResponse ? (
                        <Typography variant="h6">
                            Previous AI Suggestions:
                        </Typography>
                    ) : (
                        <Typography variant="h6">
                            Generate Report for getting suggessions
                        </Typography>
                    )}
                    <Typography whiteSpace={"pre-line"}>
                        {openAiResponse}
                    </Typography>
                </Box>
            )}
            {error && (
                <Typography
                    variant="body1"
                    color="error"
                    style={{ marginTop: "10px" }}
                >
                    Error: {error}
                </Typography>
            )}
        </Paper>
    );
};

export default OpenAiReport;
