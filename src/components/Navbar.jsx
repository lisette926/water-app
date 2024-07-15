import React, { useState } from "react";
import { Link } from "react-router-dom";
import menuBar from "../assets/munu-bar.png";
import closeIcon from "../assets/icon-close.png";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(true);
  const hideSidebar = () => setSidebar(false);

  const QualityBanner = () => {
    return <div className="quality-banner">Water Quality Data</div>;
  };

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
