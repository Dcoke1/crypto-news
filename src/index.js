import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./app/store";
import "antd/dist/antd.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Router>
    <Provider store={store}>
      <App tab="home" />
    </Provider>
  </Router>
);
