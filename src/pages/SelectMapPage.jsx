// pages/SelectMapPage.jsx
import React from "react";
import Map from "../components/selectmap/Map";
import "../style/SelectMapPage.css";

export default function SelectMapPage() {
  return (
    <div className="map-page">
      <h1 className="text"> 여행지를 뽑아주세요 !</h1>
      <div className="map-box">
        <Map />
      </div>
    </div>
  );
}
