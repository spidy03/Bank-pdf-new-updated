import React from "react";

const HighlightBox = ({ x = 0, y = 0, width = 40, height = 40 }) => {
  const size = Math.max(width, height);
  const centerX = x + width / 2 - size / 2;
  const centerY = y + height / 2 - size / 2;

  return (
    <>
      <style>{`
				@keyframes radial-pulse-demo {
					0% { transform: scale(0.3); opacity: 0.9; }
					60% { transform: scale(1.1); opacity: 0.35; }
					100% { transform: scale(1.8); opacity: 0; }
				}
			`}</style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: centerX,
          top: centerY,
          width: size,
          height: size,
          pointerEvents: "none",
          zIndex: 9,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(0, 38, 255, 0.73)",
            transformOrigin: "center",
            animation: "radial-pulse-demo 1.8s ease-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(0, 38, 255, 0.28)",
            transformOrigin: "center",
            animation: "radial-pulse-demo 1.8s ease-out 0.4s infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(0, 38, 255, 0.23)",
            transformOrigin: "center",
            animation: "radial-pulse-demo 1.8s ease-out 0.8s infinite",
          }}
        />
      </div>
    </>
  );
};

export default HighlightBox;
