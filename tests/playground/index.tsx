import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Interior from "./interior";
import Exterior from "./exterior";

createRoot(document.getElementById("app")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/inner" element={<Interior />} />
      <Route path="/" element={<Exterior />} />
    </Routes>
  </BrowserRouter>
);
