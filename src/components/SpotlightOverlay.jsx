import React from "react";

const SpotlightOverlay = ({ x, y, width, height, scaleX = 1, scaleY = 1 }) => {
  const spotX = x * scaleX;
  const spotY = y * scaleY;
  const spotWidth = width * scaleX;
  const spotHeight = height * scaleY;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const avgScale = (scaleX + scaleY) / 2 || 1;
  const padding = clamp(8 * avgScale, 6, 14);
  const spotlightX = spotX - padding;
  const spotlightY = spotY - padding;
  const spotlightWidth = spotWidth + padding * 2;
  const spotlightHeight = spotHeight + padding * 2;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 50,
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${spotlightY}px`,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          transition: "all 0.3s ease",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `${spotlightY}px`,
          left: 0,
          right: 0,
          height: `${spotlightHeight}px`,
          display: "flex",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            width: `${spotlightX}px`,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        />
        <div
          style={{
            width: `${spotlightWidth}px`,
            height: "100%",
            backgroundColor: "transparent",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          {/* Gradient border with square corners, aligned to the blue system */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: "0px",
              border: `${clamp(2.5 * avgScale, 2, 3.5)}px solid transparent`,
              background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 45%, #60a5fa 100%) border-box",
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              boxShadow: "0 0 14px rgba(37, 99, 235, 0.45), 0 0 28px rgba(96, 165, 250, 0.24), inset 0 0 12px rgba(37, 99, 235, 0.16)",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: `${spotlightY + spotlightHeight}px`,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          transition: "all 0.3s ease",
        }}
      />
    </div>
  );
};

export default SpotlightOverlay;
