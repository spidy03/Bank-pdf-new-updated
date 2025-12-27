import React, { useState, useEffect } from "react";

const InstructionCard = ({
  title,
  description,
  onPrevious,
  onNext,
  currentStep,
  totalSteps,
  position = "bottom",
  gapOffset = 0,
  x,
  y,
  width,
  height,
  scaleX = 1,
  scaleY = 1,
  containerWidth = 0,
  containerHeight = 0,
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

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const avgScale = (scaleX + scaleY) / 2 || 1;
  const responsiveScale = containerWidth ? clamp(containerWidth / 640, 0.55, 1) : avgScale;
  const effScale = Math.min(avgScale, responsiveScale);

  const targetWidth = containerWidth ? clamp(containerWidth * 0.7, 210, 420) : 320;
  const baseWidth = clamp(targetWidth * effScale, 210, 420);
  const cardWidth = containerWidth ? clamp(baseWidth, 210, Math.max(210, containerWidth - 20)) : baseWidth;
  const cardPadding = clamp(18 * effScale, 12, 22);
  const arrowSize = clamp(10 * effScale, 8, 14);
  const estimatedCardHeight = clamp(210 * effScale, 160, 300);

  const isNarrow = cardWidth < 300;

  const maxCardHeight = containerHeight ? Math.max(160, containerHeight * 0.55) : 9999;

  let cardX = 0;
  let cardY = 0;
  let arrowX = 0;
  let arrowY = 0;
  let arrowRotation = 0;

  const gap = 20 + gapOffset;

  if (position === "bottom") {
    cardX = spotX + spotWidth / 2 - cardWidth / 2;
    cardY = spotY + spotHeight + gap;
    arrowX = cardWidth / 2 - arrowSize;
    arrowY = -arrowSize;
    arrowRotation = 0;
  } else if (position === "top") {
    cardX = spotX + spotWidth / 2 - cardWidth / 2;
    cardY = spotY - estimatedCardHeight - gap;
    arrowX = cardWidth / 2 - arrowSize;
    arrowY = "100%";
    arrowRotation = 180;
  } else if (position === "top-right") {
    cardX = spotX + spotWidth - cardWidth + gap;
    cardY = spotY - estimatedCardHeight - gap;
    arrowX = cardWidth - arrowSize * 2;
    arrowY = "100%";
    arrowRotation = 180;
  } else if (position === "left") {
    cardX = spotX - cardWidth - gap;
    cardY = spotY + spotHeight / 2 - estimatedCardHeight / 2;
    arrowX = cardWidth - 2;
    arrowY = estimatedCardHeight / 2 - arrowSize;
    arrowRotation = 90;
  } else if (position === "right") {
    cardX = spotX + spotWidth + gap;
    cardY = spotY + spotHeight / 2 - estimatedCardHeight / 2;
    arrowX = -arrowSize - 2;
    arrowY = estimatedCardHeight / 2 - arrowSize;
    arrowRotation = -90;
  }

  const maxX = containerWidth ? containerWidth - cardWidth - 12 : cardX;
  const maxY = containerHeight ? containerHeight - estimatedCardHeight - 12 : cardY;
  const clampedX = containerWidth ? clamp(cardX, 12, Math.max(12, maxX)) : cardX;
  const clampedY = containerHeight ? clamp(cardY, 12, Math.max(12, maxY)) : cardY;

  const offsetX = cardX - clampedX;
  const offsetY = cardY - clampedY;

  const adjustedArrowX = typeof arrowX === "number"
    ? clamp(arrowX - offsetX, 12, cardWidth - 12)
    : arrowX;

  const adjustedArrowY = typeof arrowY === "number"
    ? clamp(arrowY - offsetY, 12, estimatedCardHeight - 12)
    : arrowY;

  return (
    <div
      style={{
        position: "absolute",
        left: `${clampedX}px`,
        top: `${clampedY}px`,
        width: `${cardWidth}px`,
        maxWidth: "88vw",
        maxHeight: `${maxCardHeight}px`,
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        borderRadius: isNarrow ? "14px" : "18px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
        overflow: "hidden",
        zIndex: 100,
        pointerEvents: "auto",
        animation: "fadeIn 0.4s ease-in-out, cardSlideIn 0.5s ease-out",
      }}
    >
      {/* Simple rail + header row */}
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: `${cardPadding}px`, overflowY: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", paddingTop: "2px" }}>
          <div style={{ width: `${arrowSize}px`, height: `${arrowSize}px`, background: "#2563eb", borderRadius: "50%" }} />
          <div style={{ width: "2px", height: "100px", background: "#e5e7eb" }} />
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb", letterSpacing: "0.4px", marginBottom: "6px" }}>
            STEP {currentStep} / {totalSteps}
          </div>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "clamp(15px, 1.9vw, 19px)", color: "#0f172a", lineHeight: "1.3", fontWeight: 700, letterSpacing: "-0.2px" }}>
            {displayedTitle}
          </h3>
          <p style={{ margin: 0, fontSize: "clamp(12px, 1.5vw, 14px)", color: "#475569", lineHeight: "1.6", textAlign: "left", wordBreak: "break-word" }}>
            {displayedDescription}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isNarrow ? "column" : "row",
              alignItems: "center",
              gap: isNarrow ? "8px" : "10px",
              marginTop: "14px",
            }}
          >
            <button
              onClick={onPrevious}
              disabled={isFirstStep}
              style={{
                flex: isNarrow ? "1" : "0 0 auto",
                width: isNarrow ? "100%" : "auto",
                padding: "9px 12px",
                background: isFirstStep ? "#f8fafc" : "#ffffff",
                color: isFirstStep ? "#cbd5e1" : "#334155",
                border: "1px solid",
                borderColor: isFirstStep ? "#e2e8f0" : "#e2e8f0",
                borderRadius: "10px",
                fontSize: "clamp(12.5px, 1.5vw, 13.5px)",
                fontWeight: "600",
                cursor: isFirstStep ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
                minWidth: "44px",
              }}
              onMouseEnter={(e) => {
                if (!isFirstStep) {
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.color = "#2563eb";
                }
              }}
              onMouseLeave={(e) => {
                if (!isFirstStep) {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.color = "#334155";
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={onNext}
              disabled={isLastStep}
              style={{
                flex: "1",
                width: isNarrow ? "100%" : "auto",
                padding: "10px 16px",
                background: isLastStep ? "#cbd5e1" : "#2563eb",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontSize: "clamp(13.5px, 1.7vw, 14.5px)",
                fontWeight: "700",
                cursor: isLastStep ? "not-allowed" : "pointer",
                letterSpacing: "0.3px",
                transition: "all 0.2s ease",
                boxShadow: isLastStep ? "none" : "0 12px 30px rgba(37,99,235,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                fontFamily: "'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!isLastStep) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 14px 36px rgba(37,99,235,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLastStep) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(37,99,235,0.25)";
                }
              }}
            >
              {isLastStep ? "Finish" : "Next"}
              {!isLastStep && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InstructionCard;
