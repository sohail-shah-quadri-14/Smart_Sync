import axios from 'axios';
import { GROQ_API_KEY, API_URL } from '../config/config';

export const analyzeQRContent = async (content) => {
  if (!content) {
    throw new Error('No content provided for analysis');
  }

  try {
    console.log('Sending request to GROQ API...');
    
    const response = await axios({
      method: 'post',
      url: API_URL,
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant specialized in analyzing and explaining content. Provide clear and detailed explanations."
          },
          {
            role: "user",
            content: content
          }
        ]
      },
      timeout: 30000, // 30 second timeout
    });

    console.log('Response received:', response.status);

    if (response.data?.choices?.[0]?.message?.content) {
      return response.data.choices[0].message.content;
    } else {
      console.error('Unexpected API response format:', response.data);
      return "No response from the model.";
    }
  } catch (error) {
    console.error('API Error:', error);
    
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.error?.message || "Error communicating with Groq API");
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('Failed to connect to Groq API. Please check your internet connection.');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error('Error communicating with Groq API');
    }
  }
}; 