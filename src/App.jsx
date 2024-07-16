import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import MetricDetail from "./routes/MetricDetail"; // Import the MetricDetail component
import Navbar from "./components/Navbar";
import ScheduleWakeUp from "./routes/ScheduleWakeUp";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metric/:metricName" element={<MetricDetail />} />
        <Route path="/schedule-wake-up" element={<ScheduleWakeUp />} />
      </Routes>
    </Router>
  );
};

export default App;
