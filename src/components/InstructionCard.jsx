import React, { useState, useEffect } from "react";

const InstructionCard = ({
  title,
  description,
  onPrevious,
  onNext,
  currentStep,
  totalSteps,
  position = "bottom",
  x,
  y,
  width,
  height,
  scaleX = 1,
  scaleY = 1,
  isFirstStep = false,
  isLastStep = false,
}) => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [displayedDescription, setDisplayedDescription] = useState("");
  const [titleComplete, setTitleComplete] = useState(false);

  useEffect(() => {
    setDisplayedTitle("");
    setDisplayedDescription("");
    setTitleComplete(false);

    let titleIndex = 0;
    const titleInterval = setInterval(() => {
      if (titleIndex < title.length) {
        setDisplayedTitle(title.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleInterval);
        setTitleComplete(true);
      }
    }, 50);

    return () => clearInterval(titleInterval);
  }, [title]);

  useEffect(() => {
    if (!titleComplete) return;

    let descIndex = 0;
    const descInterval = setInterval(() => {
      if (descIndex < description.length) {
        setDisplayedDescription(description.slice(0, descIndex + 1));
        descIndex++;
      } else {
        clearInterval(descInterval);
      }
    }, 50);

    return () => clearInterval(descInterval);
  }, [titleComplete, description]);

  const spotX = x * scaleX;
  const spotY = y * scaleY;
  const spotWidth = width * scaleX;
  const spotHeight = height * scaleY;

  const cardWidth = 380;
  const cardPadding = 24;
  const arrowSize = 12;

  let cardX = 0;
  let cardY = 0;
  let arrowX = 0;
  let arrowY = 0;
  let arrowRotation = 0;

  if (position === "bottom") {
    cardX = spotX + spotWidth / 2 - cardWidth / 2;
    cardY = spotY + spotHeight + 20;
    arrowX = cardWidth / 2 - arrowSize;
    arrowY = -arrowSize;
    arrowRotation = 0;
  } else if (position === "top") {
    cardX = spotX + spotWidth / 2 - cardWidth / 2;
    cardY = spotY - 200 - 20;
    arrowX = cardWidth / 2 - arrowSize;
    arrowY = "100%";
    arrowRotation = 180;
  } else if (position === "left") {
    cardX = spotX - cardWidth - 20;
    cardY = spotY + spotHeight / 2 - 100;
    arrowX = cardWidth - 2;
    arrowY = 100;
    arrowRotation = 90;
  } else if (position === "right") {
    cardX = spotX + spotWidth + 20;
    cardY = spotY + spotHeight / 2 - 100;
    arrowX = -arrowSize - 2;
    arrowY = 100;
    arrowRotation = -90;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: `${cardX}px`,
        top: `${cardY}px`,
        width: `${cardWidth}px`,
        background: "#ffffff",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        zIndex: 100,
        pointerEvents: "auto",
        animation: "fadeIn 0.5s ease-in-out 0.3s both, cardSlideIn 0.6s ease-out 0.3s both",
      }}
    >
      {/* Gradient header bar */}
      <div
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
          padding: "20px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "200%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            animation: "shimmer 3s infinite",
          }}
        />

        {/* Step counter badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(10px)",
            padding: "6px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              background: "#fff",
              borderRadius: "50%",
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: "#ffffff",
              fontWeight: "700",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Step {currentStep} / {totalSteps}
          </span>
        </div>
      </div>

      {/* Arrow pointer */}
      <div
        style={{
          position: "absolute",
          left: typeof arrowX === "number" ? `${arrowX}px` : arrowX,
          top: typeof arrowY === "number" ? `${arrowY}px` : arrowY,
          width: 0,
          height: 0,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid #ffffff`,
          transform: `rotate(${arrowRotation}deg)`,
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
          zIndex: 1,
        }}
      />

      {/* Content area */}
      <div style={{ padding: "24px" }}>
        {/* Title with animated underline */}
        <div style={{ marginBottom: "16px", position: "relative" }}>
          <h3
            style={{
              margin: "0",
              fontSize: "24px",
              fontWeight: "700",
              color: "#0f172a",
              lineHeight: "1.3",
              fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
              minHeight: "28px",
              letterSpacing: "-0.5px",
            }}
          >
            {displayedTitle}
          </h3>
          <div
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
              borderRadius: "2px",
              marginTop: "8px",
              width: displayedTitle.length > 0 ? "100%" : "0%",
              transition: "width 0.3s ease-out",
            }}
          />
        </div>

        {/* Description */}
        <p
          style={{
            margin: "0 0 24px 0",
            fontSize: "15px",
            color: "#64748b",
            lineHeight: "1.7",
            fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
            minHeight: "65px",
            textAlign: "left",
          }}
        >
          {displayedDescription}
        </p>

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={onPrevious}
            disabled={isFirstStep}
            style={{
              flex: "0 0 auto",
              padding: "10px",
              background: isFirstStep ? "#f1f5f9" : "#ffffff",
              color: isFirstStep ? "#cbd5e1" : "#64748b",
              border: "2px solid",
              borderColor: isFirstStep ? "#e2e8f0" : "#e2e8f0",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: isFirstStep ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
              fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (!isFirstStep) {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.color = "#3b82f6";
                e.currentTarget.style.transform = "scale(1.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isFirstStep) {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.color = "#64748b";
                e.currentTarget.style.transform = "scale(1)";
              }
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={onNext}
            disabled={isLastStep}
            style={{
              flex: "1",
              padding: "12px 24px",
              background: isLastStep ? "#cbd5e1" : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: isLastStep ? "not-allowed" : "pointer",
              letterSpacing: "0.3px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isLastStep ? "none" : "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
              position: "relative",
              overflow: "hidden",
              fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
            }}
            onMouseEnter={(e) => {
              if (!isLastStep) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px 0 rgba(59, 130, 246, 0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLastStep) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px 0 rgba(59, 130, 246, 0.4)";
              }
            }}
          >
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              {isLastStep ? "Finish" : "Next"}
              {!isLastStep && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          height: "4px",
          background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
        }}
      />
    </div>
  );
};

export default InstructionCard;
