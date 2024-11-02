import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import "../style/result.css";
import gangwondo from "../assets/gangwondo.jpeg";
import gyungi from "../assets/gyungi.jpeg";
import jeju from "../assets/jeju.jpeg";
import junbuk from "../assets/junbuk.jpeg";
import gyungbuk from "../assets/gyungbuk.jpeg";
import chungcungbukdo from "../assets/chungcungbukdo.png";
import chungcungnamdo from "../assets/chungcungnamdo.jpeg";
import gyungnam from "../assets/gyungnam.jpeg";

export default function Result() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { teamName, keywords, place, day } = useStore();
  const [postKeywords, setPostKeyWords] = useState();

  // 이미지 매핑
  const imageMap = {
    강원도: gangwondo,
    경기도: gyungi,
    제주도: jeju,
    전라북도: junbuk,
    경상북도: gyungbuk,
    충청북도: chungcungbukdo,
    충청남도: chungcungnamdo,
    경상남도: gyungnam,
  };

  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    // place에 따라 배경 이미지 설정
    setBgImage(imageMap[place] || gyungi); // 기본 이미지는 경기도로 설정
  }, [place]); // place가 변경될 때마다 실행

  useEffect(() => {
    const newKeywords = keywords.map((keyword) => keyword);
    setPostKeyWords(newKeywords);
  }, [keywords]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4-turbo",
              messages: [
                {
                  role: "user",
                  content: `여행지는 ${place}쪽이고 ${postKeywords}키워드는 ${day}일 다녀올 예정이야  여행지를 1개만 추천해줄래 ? 나는 split 사용해서 인덱스 별로 사용자들에게 보여줄거야 그러니까 다른 접두어 빼고 여행지이름/1일차코스/2일차코스 식으로 설명해줘 / ~ / 안에는 1일 코스가 있어야돼`,
                },
              ],
              temperature: 0.5,
              max_tokens: 200,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }

        const data = await response.json();
        setResult(data); // API 응답을 상태에 저장
      } catch (err) {
        setError(err.message); // 오류 메시지를 상태에 저장
      } finally {
        setLoading(false); // 로딩 상태를 false로 변경
      }
    };

    postKeywords && fetchData();
  }, [postKeywords]);

  const imageStyle = {
    position: "absolute",
    bottom: "120px", // 하단에서 120px
    right: "20px", // 우측에서 20px
    opacity: 0.7, // 슬며시 보이게 하기 위해 투명도 조정
    width: "300px", // 이미지 크기 조정 (필요에 따라 조정)
    height: "auto", // 비율 유지
    backgroundColor: "transparent",
  };

  return (
    <div className="background">
      <img src={bgImage} alt="Background" style={imageStyle} />
      <div className="topWrapper">
        <div className="teamNameWrapper">
          <p className="teamName">'{teamName}' </p>는
        </div>
        <div className="keywordWrapper">
          {keywords.length > 0 ? (
            keywords.map((keyword) => (
              <span
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
            <></>
          )}
          을 주제로
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className="teamName">{place}</p> 으로 <p>{day}일</p> 갑니다.
        </div>
      </div>
      <div className="resultWrapper">
        <p className="title">
          {result && result.choices[0].message.content.split("/")[0]}
        </p>
        <div className="reasonWrapper">
          {result &&
            result.choices[0].message.content
              .split("/")
              .slice(1)
              .map((v, index) => (
                <div className="dayWrapper" key={`day_${index}`}>
                  <p className="day">{index + 1} 일차</p>
                  <p className="course">{v}</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
