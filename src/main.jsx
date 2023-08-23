import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configureAppStore from "./context/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import App from "./App.jsx";
import "./index.css";

const store = configureAppStore();
let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
