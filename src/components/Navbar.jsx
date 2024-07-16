import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import menuBar from "../assets/munu-bar.png";
import closeIcon from "../assets/icon-close.png";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(true);
  const hideSidebar = () => setSidebar(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  //get timestamp data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://smart-seawall-server-4c5cb6fd8f61.herokuapp.com/api/data",
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        if (data && data.length > 0) {
          const mostRecentData = data[data.length - 1];
          setLastUpdated(mostRecentData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalID = setInterval(fetchData, 15000); //15 second intervals
  }, []);

  //banner
  const QualityBanner = () => (
    <div className="quality-banner">
      Water Quality Data
      {lastUpdated ? (
        <div className="timestamp">
          Data last updated: {lastUpdated.Month} {lastUpdated.Day},{" "}
          {lastUpdated.Year} at {lastUpdated.Hour}:{lastUpdated.Minute}:
          {lastUpdated.Second}
        </div>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );

  return (
    <>
      <div className="navbar">
        {!sidebar && (
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            <img src={menuBar} alt="Menu Bar Icon" className="menu-icon" />
          </Link>
        )}

        {sidebar && (
          <Link to="#" className="menu-bars" onClick={hideSidebar}>
            <img src={closeIcon} alt="Close Icon" className="close-icon" />
          </Link>
        )}

        <QualityBanner />
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars" onClick={hideSidebar}>
              <img src={closeIcon} alt="Close Icon" className="close-icon" />
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path} onClick={hideSidebar}>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
