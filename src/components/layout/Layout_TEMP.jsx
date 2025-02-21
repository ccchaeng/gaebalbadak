import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet /> {/* 이 부분이 실제 라우트 컴포넌트를 렌더링함 */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
