import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App.jsx";
import './index.css'

const rootElement = document.getElementById("root");

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}
