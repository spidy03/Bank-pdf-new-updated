import React, { useMemo } from "react";

const SpotlightOverlay = ({ x, y, width, height, scaleX = 1, scaleY = 1, holes }) => {
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const holeList = holes && holes.length ? holes : [{ x, y, width, height }];
  const avgScale = (scaleX + scaleY) / 2 || 1;
  const padding = clamp(8 * avgScale, 6, 14);
  const strokeWidth = clamp(2.5 * avgScale, 2, 3.5);

  const uniqueId = useMemo(() => Math.random().toString(36).slice(2, 8), []);
  const maskId = `spotlight-mask-${uniqueId}`;
  const gradientId = `spotlight-gradient-${uniqueId}`;

  // When there is more than one hole, render a single overlay with multiple cutouts so both regions stay visible.
  if (holeList.length > 1) {
    const paddedHoles = holeList.map((hole) => {
      const spotX = hole.x * scaleX;
      const spotY = hole.y * scaleY;
      const spotWidth = hole.width * scaleX;
      const spotHeight = hole.height * scaleY;
      return {
        x: spotX - padding,
        y: spotY - padding,
        width: spotWidth + padding * 2,
        height: spotHeight + padding * 2,
      };
    });

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
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="45%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <mask id={maskId} x="0" y="0" width="100%" height="100%">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {paddedHoles.map((hole, idx) => (
                <rect
                  key={`hole-mask-${idx}`}
                  x={hole.x}
                  y={hole.y}
                  width={hole.width}
                  height={hole.height}
                  fill="black"
                />
              ))}
            </mask>
          </defs>

          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.7)"
            mask={`url(#${maskId})`}
          />

          {paddedHoles.map((hole, idx) => (
            <rect
              key={`hole-border-${idx}`}
              x={hole.x}
              y={hole.y}
              width={hole.width}
              height={hole.height}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={strokeWidth}
              style={{
                boxShadow: "0 0 14px rgba(37, 99, 235, 0.45), 0 0 28px rgba(96, 165, 250, 0.24), inset 0 0 12px rgba(37, 99, 235, 0.16)",
              }}
            />
          ))}
        </svg>
      </div>
    );
  }

  // Single-hole fallback matches the original rendering.
  const [{ x: singleX, y: singleY, width: singleWidth, height: singleHeight }] = holeList;
  const spotX = singleX * scaleX;
  const spotY = singleY * scaleY;
  const spotWidth = singleWidth * scaleX;
  const spotHeight = singleHeight * scaleY;
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
              border: `${strokeWidth}px solid transparent`,
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
