import React from 'react';
import { Box } from '@mui/material';
import SummaryCard from '../services/summary/SummaryCard';
import ParagraphCard from '../services/paragraph/ParagraphCard';
import ChatbotCard from '../services/chatbot/ChatbotCard';
import JsConverterCard from '../services/jsConverter/jsConverterCard';
import ScifiImageCard from '../services/sci-fi-image/ScifiImageCard';



const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <SummaryCard />
      <ParagraphCard />
      <ChatbotCard />
      <JsConverterCard />
      <ScifiImageCard />
    </Box>
  )
}

export default HomePage
