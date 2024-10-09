// src/utils/fetchAiResponse.js

import axios from 'axios';

const HUGGING_FACE_API_URL = process.env.REACT_APP_HUGGING_FACE_API_URL;
const HUGGING_FACE_API_KEY = process.env.REACT_APP_HUGGING_FACE_API_KEY;

export const fetchAiResponse = async (text) => {
  try {
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data.length > 0 ? response.data[0].generated_text : 'No response from AI';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw new Error('Failed to fetch AI response');
  }
};
