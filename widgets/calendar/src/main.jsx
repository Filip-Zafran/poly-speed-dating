import React from "react";
import ReactDOM from "react-dom/client";
import Calendar from "./Calendar.jsx";
import "./calendar.css";

const rootEl = document.getElementById("calendar-root");
if (rootEl) {
  // read events from a global var injected by the page
  const events = window.PSD_EVENTS || [];
  ReactDOM.createRoot(rootEl).render(<Calendar events={events} />);
}
