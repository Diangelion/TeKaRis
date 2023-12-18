import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// PWA elements
import { defineCustomElements } from "@ionic/pwa-elements/loader";

// Context
import { ContextProvider } from "./context/ContextProvider";

const container = document.getElementById("root");
const root = createRoot(container!);
defineCustomElements(window);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>
);
