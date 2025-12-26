import React from "react";

const CommentBox = ({
  x = 0,
  y = 0,
  width = 40,
  height = 40,
  text = "Follow the highlighted area to proceed.",
}) => {
  const boxWidth = 320;
  const boxHeight = 60;

  // Position at bottom-center of the frame, moved 150px to the left
  const left = "calc(45% - 150px)";
  const transform = "translateX(-50%)";
  const bottom = 40; // 40px from bottom

  return (
    <div
      style={{
        position: "absolute",
        left,
        transform,
        bottom,
        width: boxWidth,
        height: boxHeight,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        border: "none",
        borderRadius: 12,
        boxShadow:
          "0 12px 32px rgba(102, 126, 234, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset",
        padding: "14px 20px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        pointerEvents: "none",
        fontSize: 15,
        fontWeight: 600,
        color: "#fff",
        letterSpacing: "0.3px",
      }}
    >
      {text}
    </div>
  );
};

export default CommentBox;
