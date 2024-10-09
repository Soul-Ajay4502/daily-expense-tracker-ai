import React, { useState } from 'react';
import { Button, Typography, Paper, CircularProgress, Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAiResponse,
  setLoading,
  setError,
  clearOpenAiData,
} from '../../redux/slices/openAiSlice'; // Import OpenAI actions
import axios from 'axios';


const OPENAI_API_URL = 'https://api.openai.com/v1/completions'; // Adjust based on the OpenAI API you are using
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Ensure your API key is stored securely

export const fetchOpenAiResponse = async (prompt) => {
    try {
      const response = await axios.post(OPENAI_API_URL, {
        model: 'text-davinci-003', // Use the appropriate model for your use case
        prompt: prompt,
        max_tokens: 150,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      });
  
      return response.data.choices[0].text; // Adjust based on your needs
    } catch (error) {
      throw new Error('Failed to fetch OpenAI response: ' + error.message);
    }
  };
const OpenAiReport = () => {
  const dispatch = useDispatch();
  const { aiResponse, loading: aiLoading, error: aiError } = useSelector(
    (state) => state.openAi
  );

  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    dispatch(clearOpenAiData()); // Clear previous OpenAI data

    try {
      // Your report generation logic here
      const generatedReport = 'Your generated report content'; // Replace with actual report generation logic
      setReport(generatedReport);

      // Fetch OpenAI response based on the generated report
      const aiResponse = await fetchOpenAiResponse(generatedReport);
      dispatch(setAiResponse(aiResponse));
    } catch (error) {
      dispatch(setError(error.message));
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h2" textAlign="center">
        openAI-Powered Financial Report
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={generateReport}
        style={{ marginTop: '10px' }}
      >
        Generate AI Report
      </Button>
      {loading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {aiLoading && <CircularProgress style={{ marginLeft: '10px' }} />}
      {report && (
        <Box
          variant="h6"
          bgcolor="#f0f0f0"
          position="relative"
          sx={{
            borderRadius: 1,
            px: 4,
            py: 8,
            overflow: 'hidden',
            whiteSpace: 'pre-line',
            mt: 2,
          }}
        >
          {report}
        </Box>
      )}
      {aiResponse && (
        <Box
          variant="h6"
          bgcolor="#58b9ed"
          position="relative"
          sx={{
            borderRadius: 1,
            px: 2,
            py: 8,
            overflow: 'hidden',
            whiteSpace: 'pre-line',
            mt: 2,
          }}
        >
          <Typography variant="h6">OpenAI Response:</Typography>
          <Typography variant="body1">{aiResponse}</Typography>
        </Box>
      )}
      {aiError && (
        <Typography variant="body1" color="error" style={{ marginTop: '10px' }}>
          Error: {aiError}
        </Typography>
      )}
    </Paper>
  );
};


export default OpenAiReport;
