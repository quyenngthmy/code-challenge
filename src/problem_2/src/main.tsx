import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ConfigProvider>
          <App />
      </ConfigProvider>
  </React.StrictMode>,
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ConfigProvider>
          <App />
      </ConfigProvider>
  </StrictMode>,
)
