import React from "react";
import HorizontalNavBar from "./HorizontalNavBar";
import VerticalNavBar from "./VerticalNavBar";

const Layout = ({ children }) => {
  return (
    <div className="h-full font-roboto">
      <HorizontalNavBar />
      <VerticalNavBar />
      <div className="ml-[140px] mt-[120px]">{children}</div>
    </div>
  );
};

export default Layout;
