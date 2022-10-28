import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import "./index.css";
import { Router } from "react-router-dom";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import history from "./utils/history";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
        <Provider store={store}>
            {/* <React.StrictMode> */}
                <App />
            {/* </React.StrictMode> */}
        </Provider>
    </Router>
);
