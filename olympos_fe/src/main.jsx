import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";


let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Snowfall
          style={{
            // position: "fixed",
            width: "100vw",
            // height: "100vh",

            color: "red",
          }}
        /> */}
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
