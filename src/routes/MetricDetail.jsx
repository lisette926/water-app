import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import "./MetricDetail.css";
import axios from "axios";
import { METRICS_MAP } from "../constants";

const googleDriveCsvUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSRWgtxHG2hLyrOTSPxgKrMzhGlkcqdyLV8tQobZa8B4Pah4giCjY-Ek5euXmK5hvxf3vvPLZTHfzJG/pub?gid=156216978&single=true&output=csv";

const serverData =
  "https://smart-seawall-server-4c5cb6fd8f61.herokuapp.com/api/data";

const MetricDetail = () => {
  const { metricName } = useParams();
  const [metricData, setMetricData] = useState(null);

  useEffect(() => {
    const fetchDetailedMetricData = async () => {
      try {
        const response = await axios.get(serverData);
        const data = response.data;

        console.log("Fetched data:", data);

        const metricKey = METRICS_MAP[metricName]; //new
        const metricValues = data
          .map((row) => parseFloat(row[metricKey]))
          .filter((val) => !isNaN(val) && val !== null && val !== undefined);

        // Compute current, average, highest, and lowest values
        const avg = (
          metricValues.reduce((sum, val) => sum + val, 0) / metricValues.length
        ).toFixed(2);

        const highest = Math.max(...metricValues);

        const lowest = Math.min(...metricValues);

        const latestValue = metricValues[metricValues.length - 1];

        // Set the parsed data
        setMetricData({
          current: latestValue,
          average: avg,
          highest: highest,
          lowest: lowest,
          history: metricValues,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetailedMetricData(metricName);
  }, [metricName]);

  if (!metricData) {
    return <div>Loading...</div>;
  }

  // chart
  const chartOptions = {
    chart: {
      id: "metric-chart",
    },
    xaxis: {
      categories: metricData.history.map((_, index) => index + 1),
    },
  };
  const chartSeries = [
    {
      name: metricName,
      data: metricData.history,
    },
  ];

  return (
    <div className="metric-detail">
      <div className="metric-summary">
        <div className="metric-value">{metricData.current}</div>
        <div className="metric-name">{metricName}</div>
      </div>

      {metricName === "pH" && (
        <div className="metric-status">
          <p>
            The current {metricName} is{" "}
            {metricData.current > 7
              ? "high"
              : metricData.current < 7
                ? "low"
                : "neutral"}
          </p>
        </div>
      )}

      <div className="metric-chart">
        <Chart options={chartOptions} series={chartSeries} type="line" />
      </div>

      <div className="metric-stats">
        <p>Average: {metricData.average}</p>
        <p>High: {metricData.highest}</p>
        <p>Low: {metricData.lowest}</p>
      </div>
    </div>
  );
};

export default MetricDetail;
