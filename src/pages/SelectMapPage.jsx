// pages/SelectMapPage.jsx
import React from "react";
import Map from "../components/selectmap/Map";
import "../style/SelectMapPage.css";

export default function SelectMapPage() {
  return (
    <div className="map-page">
      <h1>Select Map Page</h1>
      <div className="map-box">
        <Map />
      </div>
    </div>
  );
}
