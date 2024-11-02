// components/selectmap/Map.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";

import a from "../../assets/gyeonggi-highlighted.png";
import b from "../../assets/chungbuk-highlighted.png";
import c from "../../assets/gyeongbuk-highlighted.png";
import d from "../../assets/chungnam-highlighted.png";
import e from "../../assets/jeonbuk-highlighted.png";
import f from "../../assets/gyeongnam-highlighted.png";
import g from "../../assets/jeonnam-highlighted.png";
import h from "../../assets/jeju-highlighted.png";
import i from "../../assets/gangwon-highlighted.png";
import j from "../../assets/map-basic.png";

export default function Map() {
  const regions = [
    { id: 1, name: "경기도", src: a },
    { id: 2, name: "강원도", src: i },
    { id: 3, name: "충청북도", src: b },
    { id: 4, name: "경상북도", src: c },
    { id: 5, name: "충청남도", src: d },
    { id: 6, name: "전라북도", src: e },
    { id: 7, name: "경상남도", src: f },
    { id: 8, name: "전라남도", src: g },
    { id: 9, name: "제주도", src: h },
  ];

  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);
  const [intervalSpeed, setIntervalSpeed] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);
  const [previousIndex, setPreviousIndex] = useState(null); // 이전 인덱스 저장
  const setPlace = useStore((state) => state.setPlace);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setCurrentRegionIndex(() => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * regions.length);
        } while (randomIndex === previousIndex); // 이전 인덱스와 다를 때까지 반복

        setPreviousIndex(randomIndex); // 새로운 인덱스를 이전 인덱스로 설정

        if (intervalSpeed >= 1000) {
          setPlace(regions[randomIndex].name);
          clearInterval(intervalId);
          setIsRunning(false);
          setShowResultButton(true);
        }

        return randomIndex;
      });

      setIntervalSpeed((prevSpeed) => {
        if (prevSpeed < 200) return prevSpeed + 10;
        if (prevSpeed < 500) return prevSpeed + 20;
        return prevSpeed + 50;
      });
    }, intervalSpeed);

    return () => clearInterval(intervalId);
  }, [intervalSpeed, regions.length, setPlace, isRunning, previousIndex]);

  const startRotation = () => {
    setIsRunning(true);
    setIntervalSpeed(20);
    setShowResultButton(false);
    setPreviousIndex(null); // 초기화
  };

  const goToResultPage = () => {
    navigate("/result");
  };

  return (
    <div className="map-container">
      <img src={j} alt="Basic Map" className="base-map" />
      <img
        src={regions[currentRegionIndex].src}
        alt={regions[currentRegionIndex].name}
        className="highlighted-map"
      />
      <div className="region-name">{regions[currentRegionIndex].name}</div>
      {!showResultButton ? (
        <button className="go-button" onClick={startRotation}>
          GO
        </button>
      ) : (
        <button className="result-button" onClick={goToResultPage}>
          결과 보기
        </button>
      )}
    </div>
  );
}
