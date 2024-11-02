import React from "react";
import Layout from "./common/Layout";
import Result from "./pages/Result";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<h1>홈 페이지</h1>} /> {/* 기본 경로 */}
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
