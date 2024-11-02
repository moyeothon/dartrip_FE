import React, { useEffect, useState } from "react";
import useStore from "../store/useStore";
import "../style/result.css";

export default function Result() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { teamName, keywords, place } = useStore();

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
              model: "gpt-4o-mini",
              messages: [
                {
                  role: "user",
                  content: `여행지는 ${place}쪽이고 ${keywords}키워드는 day일 다녀올 예정이야 여행지를 1개만 추천해줄래 ? 숫자는 안붙혀도 되고 내가 포맷팅할려고하는데 그냥 장소/1일차/2일차/.../n일차  순으로 해줘 나한테 가독성 있게 보여줄일은 없고 장소/1일차/2일차3일차/.../ 으로만 해줘 split(['/'])으로 표현할수 있게 예를들어 양양/점심은 ~~을 먹고 저녁은 ~~로 마무리합니다./아침에 ~~을 방문해 좋은 추억을 남깁니다. 1일차 앞에 빼고 ~~다 로 마무리해줘 식으로  
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

    fetchData();
  }, []); // 컴포넌트가 마운트될 때만 실행

  // if (loading) {
  //   return <p>로딩 중...</p>;
  // }

  // if (error) {
  //   return <p>오류: {error}</p>;
  // }

  return (
    <div>
      <div className="topWrapper">
        <div>{teamName}은 </div>
        <div>{keywords}</div>
        <div>{place} 으로 갑니다.</div>
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
