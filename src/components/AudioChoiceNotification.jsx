import React, { useState, useEffect } from "react";

const AudioChoiceNotification = ({ audioSrc, onPlayAudio, onSkipAudio }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [playHover, setPlayHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // No auto-dismiss - user must click Play button to start demo

  const handlePlayClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onPlayAudio();
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  // Mobile: full overlay with centered card
  // Desktop: positioned notification
  const notificationStyles = isMobile ? {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 10000,
    animation: isExiting ? "fadeOut 0.3s ease-in-out forwards" : "fadeIn 0.3s ease-out",
    padding: "16px",
    boxSizing: "border-box",
  } : {
    position: "fixed",
    top: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "360px",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 10000,
    animation: isExiting ? "slideOutUp 0.3s ease-in-out forwards" : "slideInDown 0.4s ease-out",
    fontFamily: "Inter, sans-serif",
  };

  const cardStyles = isMobile ? {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "12px",
    padding: "20px 16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
    width: "100%",
    maxWidth: "340px",
    fontFamily: "Inter, sans-serif",
    animation: isExiting ? "scaleOut 0.3s ease-in-out forwards" : "scaleIn 0.3s ease-out",
  } : {};

  const headerStyles = {
    margin: "0 0 8px 0",
    fontSize: isMobile ? "16px" : "14px",
    fontWeight: "600",
    color: "#111827",
    textAlign: isMobile ? "center" : "left",
  };

  const descriptionStyles = {
    margin: "0 0 16px 0",
    fontSize: isMobile ? "14px" : "13px",
    color: "#6b7280",
    lineHeight: "1.5",
    textAlign: isMobile ? "center" : "left",
  };

  const playButtonStyles = {
    padding: isMobile ? "14px 20px" : "8px 12px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: isMobile ? "10px" : "6px",
    fontSize: isMobile ? "15px" : "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "48px",
  };

  const playButtonHoverStyles = {
    backgroundColor: "#2563eb",
  };

  const content = (
    <>
      <div>
        <h3 style={headerStyles}>🎧 Audio Narration</h3>
        <p style={descriptionStyles}>Click below to start the demo with audio narration.</p>
      </div>

      <button
        onClick={handlePlayClick}
        style={{
          ...playButtonStyles,
          width: "100%",
          ...(playHover ? playButtonHoverStyles : {}),
        }}
        onMouseEnter={() => setPlayHover(true)}
        onMouseLeave={() => setPlayHover(false)}
      >
        <span>▶</span>
        <span>Start Demo with Audio</span>
      </button>
    </>
  );

  return (
    <>
      <style>{`
        @keyframes slideInDown {
          from {
            transform: translateX(-50%) translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutUp {
          from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          to {
            transform: translateX(-50%) translateY(-30px);
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleOut {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.9);
            opacity: 0;
          }
        }
      `}</style>

      <div style={notificationStyles}>
        {isMobile ? (
          <div style={cardStyles}>
            {content}
          </div>
        ) : (
          content
        )}
      </div>
    </>
  );
};

export default AudioChoiceNotification;
