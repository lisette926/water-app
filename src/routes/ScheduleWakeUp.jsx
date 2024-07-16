import React, { useState } from "react";
import "./ScheduleWakeUp.css";

const ScheduleWakeUp = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // need to add web sockets...
    console.log("Selected Option:", selectedOption);
  };

  return (
    <div className="schedule-wake-up">
      <h1>Schedule Wake Up</h1>
      <p>
        To collect data at a specific time,please schedule a wake-up time below.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="wake-up-options">Choose a time:</label>
        <select
          id="wake-up-options"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="" disabled>
            Select a time
          </option>
          <option value="12:00 AM">12:00 AM</option>
          <option value="2:00 AM">2:00 AM</option>
          <option value="4:00 AM">4:00 AM</option>
          <option value="6:00 AM">6:00 AM</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ScheduleWakeUp;
