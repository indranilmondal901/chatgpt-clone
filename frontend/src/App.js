import './App.css';
import { Route, Routes } from "react-router-dom"
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from './components/navbar/Navbar';
import { Toaster } from 'react-hot-toast';

import HomePage from './components/pages/HomePage';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Summary from './components/services/summary/Summary';
import Paragraph from './components/services/paragraph/Paragraph';
import Chatbot from './components/services/chatbot/Chatbot';
import JsConverter from './components/services/jsConverter/jsConverter';
import SciFiImage from './components/services/sci-fi-image/SciFiImage';

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), [])
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/paragraph' element={<Paragraph/>} />
          <Route path='/chatbot' element={<Chatbot/>} />
          <Route path='/js-converter' element={<JsConverter/>} />
          <Route path='/scifi-img' element={<SciFiImage/>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
