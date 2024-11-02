import React from "react";
import "../style/layout.css";

const Layout = ({ children }) => {
  return (
    <div className="mobile-layout">
      <header className="header">헤더</header>
      <nav className="nav">내비게이션</nav>
      <main className="content">
        {children} {/* 자식 컴포넌트가 여기에 렌더링됩니다. */}
      </main>
    </div>
  );
};

export default Layout;
