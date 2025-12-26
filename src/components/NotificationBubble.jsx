import React from "react";

const NotificationBubble = ({
  x = 0,
  y = 0,
  width = 40,
  height = 40,
  title = "IMS Report",
  lines = [],
}) => {
  // Prefer to position the notification to the left of the highlighted area; fall back to right
  const preferLeft = true;
  const bubbleWidth = 320;
  const bubbleHeight = 120;

  let left = x - bubbleWidth - 16;
  if (left < 8) left = x + width + 12; // if not enough room on left, place to right

  const top = Math.max(8, y + height / 2 - bubbleHeight / 2);

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: bubbleWidth,
        minHeight: bubbleHeight,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 6,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        padding: "12px 14px",
        zIndex: 50,
        color: "#222",
        fontFamily: "sans-serif",
      }}
      role="dialog"
      aria-label={title}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, lineHeight: "20px", color: "#333" }}>
        {lines.map((l, i) => (
          <div key={i} style={{ marginBottom: i === lines.length - 1 ? 0 : 6 }}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationBubble;
