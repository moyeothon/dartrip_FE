import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/home.css"; // 스타일 파일 추가

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/keyword");
  };

  return (
    <div className="home-container">
      <h1>Welcome to Dartrip</h1>
      <p>
        나만의 특별한 여행을 계획해보세요! 원하는 키워드와 일정을 설정하고
        맞춤형 여행지를 추천받으세요.
      </p>
      <button className="start-button" onClick={handleStart}>
        여행 시작하기
      </button>
    </div>
  );
};

export default Home;
