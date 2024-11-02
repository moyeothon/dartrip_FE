import React from "react";
import Layout from "./common/Layout";
import Result from "./pages/Result";
import Keyword from "./pages/keyword";
import Home from "./pages/Home";
import Map from "./pages/SelectMapPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          {/* 기본 경로에 Home 컴포넌트 추가 */}
          <Route path="/result" element={<Result />} />
          <Route path="/keyword" element={<Keyword />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
