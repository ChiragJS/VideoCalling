import React from "react";

const CustomWrapper = ({ children, style }) => {
  return <div style={{ position: "relative", ...style }}>{children}</div>;
};

export default CustomWrapper;
