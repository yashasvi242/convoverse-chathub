import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
// import ChatProvider from './Context/ChatProvider';
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from './Context/ChatProvider';

ReactDOM.render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>,
  document.getElementById("root")
);