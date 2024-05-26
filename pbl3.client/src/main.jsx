import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AccountContext, AccountProvider } from "./Context/AccountContext";
import App from "./App";

import "./main.css";
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <AccountProvider>
                <App />
            </AccountProvider>
        </BrowserRouter>
    </React.StrictMode>
);
