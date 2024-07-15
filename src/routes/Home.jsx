import React, { useEffect, useState } from "react";
import "../styles.css";
import axios from "axios";
import PHScale from "../components/PHScale";
import OxygenLevelCircle from "../components/OxygenLevelCircle";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [lastRowLength, setLastRowLength] = useState(0); //new
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://smart-seawall-server-4c5cb6fd8f61.herokuapp.com/api/data",
        );
        const newDataArray = response.data;
        const newDataLength = newDataArray.length;
        // Check if new data has been added since the last fetch
        if (newDataLength > lastRowLength) {
          const latestData = newDataArray[newDataLength - 1];
          setData({
            pH: latestData["pH"],
            "Oxygen Level": latestData["oxygenLevel"],
            Salinity: latestData["salinity"],
            Turbidity: latestData["turbidity"],
            TDS: latestData["tds"],
            Temperature: latestData["temperature"],
          });
          setLastRowLength(newDataLength); // Update the last row length
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalID = setInterval(fetchData, 15000); //15 second intervals

    return () => {
      clearInterval(intervalID);
    };
  }, [lastRowLength]);

  const handleMetricClick = (metricName) => {
    navigate(`/metric/${metricName}`); // Navigate to the metric detail page
  };

  return (
    <div className="dashboard">
      <Header />
      <Metrics data={data} onMetricClick={handleMetricClick} />
      <Footer />
    </div>
  );
};

const Header = () => {
  return <header></header>;
};

const QualityBanner = () => {
  return <div className="quality-banner">Water Quality Data</div>;
};

const Metrics = ({ data, onMetricClick }) => {
  return (
    <div className="metrics">
      {Object.entries(data).map(([name, value]) => (
        <Metric
          key={name}
          name={name}
          value={value}
          onMetricClick={onMetricClick}
        />
      ))}
    </div>
  );
};

const Metric = ({ name, value, onMetricClick }) => {
  return (
    <div className="metric" onClick={() => onMetricClick(name)}>
      {name === "pH" ? (
        <div className="metric-value">
          <PHScale pH={value} />
        </div>
      ) : name === "Oxygen Level" ? (
        <div className="metric-value">
          <OxygenLevelCircle oxygenLevel={value} />
        </div>
      ) : (
        <p>
          {value} {getUnitRate(name)}
        </p>
      )}
      <h2>{name}</h2>
    </div>
  );
};

const getUnitRate = (name) => {
  switch (name) {
    case "Salinity":
      return "ppm"; // Parts per million
    case "Turbidity":
      return "NTU"; // Nephelometric Turbidity Units
    case "TDS":
      return "ppm"; // Parts per million
    case "Temperature":
      return "°F"; // degrees fahrenheit
    default:
      return ""; // Default case
  }
};

const Footer = () => {
  return <footer></footer>;
};

export default Dashboard;
