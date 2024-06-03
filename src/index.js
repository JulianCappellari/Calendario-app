import React from "react";
import { createRoot } from "react-dom/client";
import './styles/styles.scss';
import CalendarioApp from "./CalendarioApp";
import { BrowserRouter as Router } from 'react-router-dom';


const root = document.getElementById("root");
const reactRoot = createRoot(root);
reactRoot.render(<React.StrictMode>
    <Router>
      <CalendarioApp />
    </Router>
  </React.StrictMode>,);