import React, { useState } from "react";

const NavigationBar = ({
  currentStep,
  totalSteps = 23,
  onNext,
  onPrevious,
  isFullscreen = false,
  disableNext = false,
}) => {
  const [isPrevHovered, setIsPrevHovered] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const handlePrevious = () => {
    if (!isFirstStep) {
      onPrevious();
    }
  };

  const handleNext = () => {
    if (!isLastStep && !disableNext) {
      onNext();
    }
  };

  // Responsive sizing based on fullscreen state
  const buttonFontSize = isFullscreen ? "11px" : "12px";
  const buttonHeight = isFullscreen ? "2.3em" : "2.5em";
  const buttonPaddingNext = isFullscreen ? "0 1.9em 0 0.9em" : "0 2.1em 0 1.0em";
  const buttonPaddingPrev = isFullscreen ? "0 0.9em 0 2.0em" : "0 1.0em 0 2.2em";

  const isNextDisabled = isLastStep || disableNext;

  // Next Button Styles (Red/Pink theme)
  const nextButtonStyle = {
    position: "relative",
    fontSize: buttonFontSize,
    letterSpacing: "2px",
    height: buttonHeight,
    padding: buttonPaddingNext,
    border: "none",
    backgroundColor: isNextDisabled ? "#666" : "#c41b54",
    color: "#fff",
    textTransform: "uppercase",
    overflow: "hidden",
    borderRadius: "5px",
    cursor: isNextDisabled ? "not-allowed" : "pointer",
    opacity: isNextDisabled ? 0.5 : 1,
    fontFamily: "Inter, Arial",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  // Previous Button Styles (Blue theme - mirrored)
  const prevButtonStyle = {
    position: "relative",
    fontSize: buttonFontSize,
    letterSpacing: "2px",
    height: buttonHeight,
    padding: buttonPaddingPrev,
    border: "none",
    backgroundColor: isFirstStep ? "#666" : "#1b54c4",
    color: "#fff",
    textTransform: "uppercase",
    overflow: "hidden",
    borderRadius: "5px",
    cursor: isFirstStep ? "not-allowed" : "pointer",
    opacity: isFirstStep ? 0.5 : 1,
    fontFamily: "Inter, Arial",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  // Container styles for desktop
  const desktopContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "12px 20px",
  };

  // Container styles for mobile
  const mobileContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    gap: "10px",
    padding: "12px",
  };

  return (
    <>
      {/* Desktop Layout */}
      <div
        style={desktopContainerStyle}
        className="nav-desktop"
      >
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={isFirstStep}
          style={prevButtonStyle}
          onMouseEnter={() => !isFirstStep && setIsPrevHovered(true)}
          onMouseLeave={() => setIsPrevHovered(false)}
          title="Previous Step"
        >
          {/* Hover overlay */}
          <span
            style={{
              content: "",
              display: "block",
              position: "absolute",
              zIndex: 0,
              bottom: 0,
              left: 0,
              height: isPrevHovered && !isFirstStep ? "100%" : "0px",
              width: "100%",
              background: "linear-gradient(90deg, rgba(7,46,124,1) 0%, rgba(27,84,196,1) 80%)",
              transition: "0.2s",
            }}
          />

          {/* Icon (left side for previous) */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "2.6em",
              width: "2.6em",
              position: "absolute",
              top: isPrevHovered && !isFirstStep ? "0" : "-2.6em",
              left: 0,
              opacity: isPrevHovered && !isFirstStep ? 1 : 0,
              transition: "0.4s",
              zIndex: 1,
            }}
          >
            <svg
              style={{ width: "16px", height: "16px", fill: "white" }}
              viewBox="0 0 24 24"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </span>

          {/* Label */}
          <span style={{ position: "relative", zIndex: 1 }}>Previous</span>
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isLastStep}
          style={nextButtonStyle}
          onMouseEnter={() => !isLastStep && setIsNextHovered(true)}
          onMouseLeave={() => setIsNextHovered(false)}
          title="Next Step"
        >
          {/* Hover overlay */}
          <span
            style={{
              content: "",
              display: "block",
              position: "absolute",
              zIndex: 0,
              bottom: 0,
              left: 0,
              height: isNextHovered && !isLastStep ? "100%" : "0px",
              width: "100%",
              background: "linear-gradient(90deg, rgba(196,27,84,1) 20%, rgba(124,7,46,1) 100%)",
              transition: "0.2s",
            }}
          />

          {/* Label */}
          <span style={{ position: "relative", zIndex: 1 }}>Next</span>

          {/* Icon (right side for next) */}
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "2.6em",
              width: "2.6em",
              position: "absolute",
              top: isNextHovered && !isLastStep ? "0" : "2.6em",
              right: 0,
              opacity: isNextHovered && !isLastStep ? 1 : 0,
              transition: "0.4s",
              zIndex: 1,
            }}
          >
            <svg
              style={{ width: "16px", height: "16px", fill: "white" }}
              viewBox="0 0 24 24"
            >
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </span>
        </button>
      </div>

      {/* Mobile Layout */}
      <div style={mobileContainerStyle} className="nav-mobile">
        {/* Previous Button Mobile */}
        <button
          onClick={handlePrevious}
          disabled={isFirstStep}
          style={{ ...prevButtonStyle, width: "100%", fontSize: "13px", height: "2.6em" }}
          onMouseEnter={() => !isFirstStep && setIsPrevHovered(true)}
          onMouseLeave={() => setIsPrevHovered(false)}
          title="Previous Step"
        >
          <span
            style={{
              display: "block",
              position: "absolute",
              zIndex: 0,
              bottom: 0,
              left: 0,
              height: isPrevHovered && !isFirstStep ? "100%" : "0px",
              width: "100%",
              background: "linear-gradient(90deg, rgba(7,46,124,1) 0%, rgba(27,84,196,1) 80%)",
              transition: "0.2s",
            }}
          />
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "2.6em",
              width: "2.6em",
              position: "absolute",
              top: isPrevHovered && !isFirstStep ? "0" : "-2.6em",
              left: 0,
              opacity: isPrevHovered && !isFirstStep ? 1 : 0,
              transition: "0.4s",
              zIndex: 1,
            }}
          >
            <svg style={{ width: "18px", height: "18px", fill: "white" }} viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </span>
          <span style={{ position: "relative", zIndex: 1 }}>Previous</span>
        </button>

        {/* Next Button Mobile */}
        <button
          onClick={handleNext}
          disabled={isLastStep}
          style={{ ...nextButtonStyle, width: "100%", fontSize: "13px", height: "2.6em" }}
          onMouseEnter={() => !isLastStep && setIsNextHovered(true)}
          onMouseLeave={() => setIsNextHovered(false)}
          title="Next Step"
        >
          <span
            style={{
              display: "block",
              position: "absolute",
              zIndex: 0,
              bottom: 0,
              left: 0,
              height: isNextHovered && !isLastStep ? "100%" : "0px",
              width: "100%",
              background: "linear-gradient(90deg, rgba(196,27,84,1) 20%, rgba(124,7,46,1) 100%)",
              transition: "0.2s",
            }}
          />
          <span style={{ position: "relative", zIndex: 1 }}>Next</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "2.6em",
              width: "2.6em",
              position: "absolute",
              top: isNextHovered && !isLastStep ? "0" : "2.6em",
              right: 0,
              opacity: isNextHovered && !isLastStep ? 1 : 0,
              transition: "0.4s",
              zIndex: 1,
            }}
          >
            <svg style={{ width: "18px", height: "18px", fill: "white" }} viewBox="0 0 24 24">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </span>
        </button>
      </div>

      {/* Media Query Styles */}
      <style>{`
        @media (min-width: 600px) {
          .nav-desktop {
            display: flex !important;
          }
          .nav-mobile {
            display: none !important;
          }
        }

        @media (max-width: 599px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default NavigationBar;
