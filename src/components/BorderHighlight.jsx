import React from "react";
import "./BorderHighlight.css";

const BorderHighlight = ({ x, y, width, height, borderColor = "#FFD700", borderWidth = 3 }) => {
  return (
    <div
      className="border-highlight"
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        border: `${borderWidth}px solid ${borderColor}`,
        boxShadow: `0 0 0 2px ${borderColor}`,
        backgroundColor: "transparent",
        pointerEvents: "none",
        zIndex: 50,
      }}
    />
  );
};

export default BorderHighlight;
