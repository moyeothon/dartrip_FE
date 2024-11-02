import React, { useEffect, useState } from "react";
import Layout from "../common/Layout";
import useStore from "../store/useStore";
export default function Result() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const { teamName, setTeamName } = useStore();

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
              // "OpenAI-Organization": "org-joUIKhObOcdR6tsnZc9CpsRA",
              // "OpenAI-Project": "proj_DbERCYDaMi9gbzSjxHzrCKIF", // 프로젝트 ID
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [
                { role: "user", content: "등산을 할 수 있는 여행지 추천해줘" },
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

    // fetchData();
  }, []); // 컴포넌트가 마운트될 때만 실행

  // if (loading) {
  //   return <p>로딩 중...</p>;
  // }

  // if (error) {
  //   return <p>오류: {error}</p>;
  // }
  const message =
    "등산을 즐길 수 있는 여행지는 여러 곳이 있습니다. 아래는 한국과 해외에서 추천할 만한 등산지입니다.\n\n### 한국\n1. **한라산 (제주도)**: 제주도의 상징적인 산으로, 정상에서의 경치가 일품입니다. 다양한 코스가 있어 난이도에 따라 선택할 수 있습니다.\n2. **설악산 (강원도)**: 아름다운 경치와 다양한 등산 코스로 유명합니다. 특히 가을 단풍 시즌에 많은 사람들이 찾습니다.\n3. **지리산 (전라북도, 경상남도)**: 한국에서 가장 높은 산 중 하나로, 다양한 트레킹 코스가 있어 여러 날 동안의 도보 여행이 가능합니다.\n4. **북한산 (서울)**: 서울 근처에 위치해 있어 접근성이 좋고, 다양한 난이도의 코스가 있습니다. 서울의 전경을 감상할 수 있는";

  return (
    <div>
      <h1>결과</h1>

      {/* <p>{result.choices[0].message.content}</p>{" "} */}
      {/* API 응답에서 콘텐츠 표시 */}
    </div>
  );
}
