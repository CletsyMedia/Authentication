import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ReactGA from "react-ga4";

ReactGA.initialize("G-TH95C9W57X");

ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
