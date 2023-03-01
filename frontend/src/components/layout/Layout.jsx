import React from "react";
import HorizontalNavBar from "./HorizontalNavBar";
import VerticalNavBar from "./VerticalNavBar";

/**
 * @component
 * A layout to wrap the app with navs bars
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */

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
