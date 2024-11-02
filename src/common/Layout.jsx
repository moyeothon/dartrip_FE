import React from "react";
import logo from "../image/IMG_8791.PNG"; // 로고 이미지 파일 경로를 실제 위치로 변경하세요.
import "../style/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="mobile-layout">
      <header className="header">
        <img src={logo} alt="Dartrip Logo" className="logo" />
      </header>
      <main className="content">
        {children} {/* 자식 컴포넌트가 여기에 렌더링됩니다. */}
      </main>
    </div>
  );
};

export default Layout;
