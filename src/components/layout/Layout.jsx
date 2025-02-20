// src/components/layout/Layout.jsx
import React from "react";
import Header from "./Header"; // Header 가져오기
import Footer from "./Footer"; // Footer 가져오기

const Layout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
