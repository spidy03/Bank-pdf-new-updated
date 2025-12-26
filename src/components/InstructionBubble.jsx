import React from "react";

const InstructionBubble = ({ text }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "white",
        padding: "14px 20px",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        fontSize: "18px",
        fontWeight: "500",
        animation: "fadeIn 0.6s ease",
        zIndex: 20
      }}
    >
      {text}
    </div>
  );
};

export default InstructionBubble;
