// export default function Keyword  ()  {
//     return(

//     )
// }

import React, { useEffect, useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";

const KeywordSelectionPage = () => {
  const { teamName, keywords, setTeamName, setKeywords } = useStore();

  const [displayedKeywords, setDisplayedKeywords] = useState([]);

  const allKeywords = [
    "스파 & 마사지",
    "명상 리트릿",
    "온천 체험",
    "요가 클래스",
    "자연 속 걷기",
    "조용한 해변",
    "힐링 음악 페스티벌",
    "서점 탐방",
    "산림욕",
    "치유 여행 프로그램",
    "등산 & 트레킹",
    "자전거 투어",
    "스쿠버 다이빙",
    "서핑 레슨",
    "암벽 등반",
    "번지 점프",
    "패러글라이딩",
    "카약 & 래프팅",
    "스노우보드 & 스키",
    "승마 체험",
    "로컬 음식 투어",
    "미슐랭 레스토랑 탐방",
    "전통시장 맛보기",
    "길거리 음식 탐험",
    "와인 & 치즈 투어",
    "베이커리 투어",
    "해산물 맛집 탐방",
    "채식 레스토랑",
    "브런치 카페",
    "디저트 투어",
    "자율 주행 로드트립",
    "자유로운 도시 탐방",
    "지역 아티스트 갤러리 방문",
    "개방된 해변 산책",
    "현지 클럽 & 바 투어",
    "현지 음악 공연",
    "노천 극장 영화 감상",
    "벼룩시장 쇼핑",
    "캠핑 & 글램핑",
    "레지던스 체험 숙박",
    "국립 공원 탐방",
    "폭포 감상",
    "강가 피크닉",
    "동굴 탐험",
    "숲 트레일",
    "야생동물 관찰",
    "해돋이 & 해넘이 명소",
    "플로랄 가든 방문",
    "자연 사진 촬영",
    "계절별 자연 체험",
    "농촌 체험",
    "전통 공예 체험",
    "역사 유적 투어",
    "어촌 체험",
    "농산물 수확 체험",
    "지역 특산물 만들기",
    "문화 유산 투어",
    "지역 축제 참가",
    "생태 교육 프로그램",
    "전통 악기 체험",
  ];

  const getRandomKeywords = () => {
    const shuffled = [...allKeywords].sort(() => 0.5 - Math.random());
    setDisplayedKeywords(shuffled.slice(0, 5));
  };

  useEffect(() => {
    getRandomKeywords();
  }, []);

  const handleKeywordClick = (keyword) => {
    setKeywords(keyword);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/result"); // "/destination" 경로로 이동
  }; // store 파일의 실제 경로로 변경하세요.

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>팀명과 키워드를 선택하세요</h2>
      <label>
        팀명:
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="팀명을 입력하세요"
          style={{ marginLeft: "10px", padding: "5px", width: "100%" }}
        />
      </label>

      <div style={{ marginTop: "20px" }}>
        <h3>키워드 선택:</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {displayedKeywords.map((keyword) => (
            <span
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              style={{
                padding: "10px 20px",
                backgroundColor: keywords.includes(keyword)
                  ? "#b3dca9"
                  : "#f0f0f0",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={getRandomKeywords}
        style={{
          marginTop: "10px",
          padding: "10px",
          backgroundColor: "#FF9800",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          margin: "auto",
        }}
        aria-label="새로고침"
      >
        <FaSyncAlt />
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>선택된 키워드:</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {keywords.length > 0 ? (
            keywords.map((keyword) => (
              <span
                onClick={() => handleKeywordClick(keyword)}
                key={keyword}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",

                  backgroundColor: "#b3dca9",
                  borderRadius: "5px",
                }}
              >
                {keyword}
              </span>
            ))
          ) : (
            <p>키워드를 선택하세요.</p>
          )}
        </div>
      </div>

      <button
        onClick={handleClick}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        다음
      </button>
    </div>
  );
};

export default KeywordSelectionPage;
