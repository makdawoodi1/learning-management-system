import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import { Provider } from "react-redux";
// import configureAppStore from "./context/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { AuthProvider } from "./context/context.jsx";

import App from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import '/assets/css/icofont.min.css';
import '/assets/css/animate.css';
import '/assets/css/style.min.css';

// const store = configureAppStore();
// let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Router>
      {/* <Provider store={store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        {/* </PersistGate> */}
        {/* </Provider> */}
      </AuthProvider>
    </Router>
  // </React.StrictMode>
);
