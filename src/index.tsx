import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import "video-react/dist/video-react.css";
import AdminRoot from "components/AdminRoot";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["drawing", "places"];

const queryClient = new QueryClient();
ReactDOM.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY || ""}
    // libraries={libraries}
    >
      <QueryClientProvider client={queryClient}>

        <AdminRoot />
      </QueryClientProvider>
    </LoadScript>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
