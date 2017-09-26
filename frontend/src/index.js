import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
