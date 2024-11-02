import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import "../style/result.css";

export default function Result() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { teamName, keywords, place, day } = useStore();

  const [postKeywords, setPostKeyWords] = useState();

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
                  content: `여행지는 ${place}쪽이고 ${postKeywords}키워드는 ${day}일 다녀올 예정이야  여행지를 1개만 추천해줄래 ? 나는 split 사용해서 인덱스 별로 사용자들에게 보여줄거야 그러니까 다른 접두어 빼고 여행지이름/1일차코스/2일차코스 식으로 설명해줘 / ~ / 안에는 1일 코스가 있어야돼
`,
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
  }, [postKeywords]); // 컴포넌트가 마운트될 때만 실행

  // if (loading) {
  //   return <p>로딩 중...</p>;
  // }

  // if (error) {
  //   return <p>오류: {error}</p>;
  // }
  console.log(keywords);
  return (
    <div>
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
      <div className="resultWrppaer">
        <p className="title">
          {result && result.choices[0].message.content.split("/")[0]}
        </p>
        <div className="reasonWrapper">
          {result &&
            result.choices[0].message.content
              .split("/")
              .slice(1)
              .map((v, index) => (
                <div className="dayWrapper">
                  <p className="day" key={`day_${index}`}>
                    {index + 1} 일차
                  </p>
                  <p className="course" key={`content_${index}`}>
                    {v}
                  </p>
                </div>
              ))}
        </div>
      </div>

      {/* API 응답에서 콘텐츠 표시 */}
    </div>
  );
}
