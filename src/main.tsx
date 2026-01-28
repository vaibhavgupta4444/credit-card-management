import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router"
import "./index.css";
import { CommonProvider } from "./contexts/commonContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CommonProvider>
      <RouterProvider router={router} />
    </CommonProvider>
  </StrictMode>
);
