import React from "react";
import "../styles/animations.css";

const Tooltip = ({
  x,
  y,
  width,
  height,
  text,
  position = "top",
  stepId = 1,
  scaleX = 1,
  scaleY = 1,
  onNext,
  tooltipVariant,
}) => {
  let tooltipX, tooltipY, arrowStyle;

  // Scale the offset values with the scale factors
  const scaledWidth = width * scaleX;
  const scaledHeight = height * scaleY;

  // Helper function to create diamond arrow style
  const createDiamondArrow = (
    position,
    bgColor = "#fff3c4",
    borderColor = "#e6d289"
  ) => {
    const baseStyle = {
      position: "absolute",
      width: `${16 * scaleX}px`,
      height: `${16 * scaleY}px`,
      background: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: `${3 * scaleX}px`,
    };

    switch (position) {
      case "bottom":
        return {
          ...baseStyle,
          bottom: `${-10 * scaleY}px`,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "top":
        return {
          ...baseStyle,
          top: `${-10 * scaleY}px`,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
        };
      case "left":
        return {
          ...baseStyle,
          left: `${-10 * scaleX}px`,
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)",
        };
      case "right":
        return {
          ...baseStyle,
          right: `${-10 * scaleX}px`,
          top: "50%",
          transform: "translateY(-50%) rotate(45deg)",
        };
      default:
        return baseStyle;
    }
  };

  if (position === "top") {
    // Different positioning for each step based on their dimensions
    // Apply scale to the offset calculations
    if (stepId === 1) {
      // Step 1: Settings button (100x40) - positioned to the left
      tooltipX = x + scaledWidth / 2 - 103 * scaleX;
      tooltipY = y - 45 * scaleY;
      arrowStyle = createDiamondArrow("bottom");
    } else if (stepId === 2) {
      // Step 2: Excel icon (50x50) - positioned above center
      tooltipX = x + scaledWidth / 2 - 110 * scaleX;
      tooltipY = y - 40 * scaleY;
      arrowStyle = createDiamondArrow("bottom");
    } else if (stepId === 11) {
      // Step 11: Preview Pdf button (top right) - positioned above center
      tooltipX = x + scaledWidth / 2 - 65 * scaleX;
      tooltipY = y - 45 * scaleY;
      arrowStyle = createDiamondArrow("bottom");
    } else if (stepId === 14) {
      // Step 14: Open Excel Sheet button - positioned above center
      tooltipX = x + scaledWidth / 2 - 70 * scaleX;
      tooltipY = y - 45 * scaleY;
      arrowStyle = createDiamondArrow("bottom");
    } else if (stepId === 15) {
      // Step 15: Import PDF Bank data button - positioned above center
      tooltipX = x + scaledWidth / 2 - 83 * scaleX;
      tooltipY = y - 50 * scaleY;
      arrowStyle = createDiamondArrow("bottom");
    } else if (stepId === "20-2") {
      // Step 20-2: Create Contra Voucher button - positioned above button
      // x is already the button's center x position, y is below the highlight area
      // Responsive: adjust for mobile/tablet/desktop
      const offsetX20_2 = window.innerWidth < 768 ? 150 * scaleX : 400 * scaleX;
      const offsetY20_2 = window.innerWidth < 768 ? 350 * scaleY : 450 * scaleY;
      tooltipX = x - offsetX20_2;
      tooltipY = y - offsetY20_2;
      arrowStyle = createDiamondArrow("bottom");
    } else if (stepId === "23-1") {
      // Step 23-1: Bank Statement button - positioned above center
      tooltipX = x + scaledWidth / 2 - 75 * scaleX;
      tooltipY = y - 50 * scaleY;
      arrowStyle = createDiamondArrow("bottom");
    }
  } else if (position === "below") {
    // Tooltip positioned below the element with arrow pointing up
    if (stepId === 3) {
      // Step 3: Open PDF Converter button - positioned below center
      tooltipX = x + scaledWidth / 2 - 110 * scaleX;
      tooltipY = y + scaledHeight + 20 * scaleY;
    } else if (stepId === 4) {
      // Step 4: Browse button - positioned below center
      tooltipX = x + scaledWidth / 2 - 90 * scaleX;
      tooltipY = y + scaledHeight + 20 * scaleY;
    } else if (stepId === 5) {
      // Step 5: File selection - positioned below center
      tooltipX = x + scaledWidth / 2 - 100 * scaleX;
      tooltipY = y + scaledHeight + 20 * scaleY;
    } else if (stepId === 6) {
      // Step 6: Open button - positioned below center
      tooltipX = x + scaledWidth / 2 - 75 * scaleX;
      tooltipY = y + scaledHeight + 5 * scaleY;
    } else if (stepId === 8) {
      // Step 8: Autodetect Tables button - positioned below center
      tooltipX = x + scaledWidth / 2 - 100 * scaleX;
      tooltipY = y + scaledHeight + 10 * scaleY;
    } else if (stepId === "24-1") {
      // Step 24: Open button - positioned below center
      tooltipX = x + scaledWidth / 2 - 67 * scaleX;
      tooltipY = y + scaledHeight + 20 * scaleY;
    } else if (stepId === "25-1") {
      // Step 25: Yes button - positioned below center
      tooltipX = x + scaledWidth / 2 - 75 * scaleX;
      tooltipY = y + scaledHeight + 20 * scaleY;
    }

    arrowStyle = createDiamondArrow("top");
  } else if (position === "right") {
    if (stepId === 5) {
      // Step 5: File selection border - tooltip right, arrow left - instruction style
      // Responsive: adjust for mobile/tablet
      const offsetX = window.innerWidth < 768 ? 5 * scaleX : 40 * scaleX;
      const offsetY = window.innerWidth < 768 ? 15 * scaleY : 20 * scaleY;
      tooltipX = x + scaledWidth + offsetX;
      tooltipY = y + scaledHeight / 2 - offsetY;
      arrowStyle = createDiamondArrow("left");
    } else if (stepId === 7) {
      // Step 7: Import button - tooltip right, arrow left
      tooltipX = x + scaledWidth + 10 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("left");
    } else if (stepId === 12) {
      // Step 12: Send to Template button - tooltip right, arrow left
      tooltipX = x + scaledWidth + 35 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("left");
    } else if (stepId === 17) {
      // Step 17: Description column - tooltip right, arrow left
      tooltipX = x + scaledWidth + 20 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("left");
    } else if (stepId === "17-1") {
      // Step 17-1: Description column - tooltip right, arrow left (note/warning style)
      // Responsive: adjust for mobile/tablet
      const offsetX17_1 = window.innerWidth < 768 ? 5 * scaleX : 20 * scaleX;
      tooltipX = x + scaledWidth + offsetX17_1;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("left", "#ff4747ff", "#ff2222");
    } else if (stepId === "19-2") {
      // Step 19-2: Voucher created - tooltip right, arrow left (instruction style)
      // Responsive: adjust for mobile/tablet
      const offsetX19_2 = window.innerWidth < 768 ? 80 * scaleX : 180 * scaleX;
      tooltipX = x + scaledWidth + offsetX19_2;
      tooltipY = y + scaledHeight / 2 + 20 * scaleY;
      arrowStyle = createDiamondArrow("left");
    } else if (stepId === "21-1") {
      // Step 21-1: Contra voucher created - tooltip right of highlight
      tooltipX = x + scaledWidth - 370 * scaleX;
      tooltipY = y + scaledHeight / 2 + 20 * scaleY;
      arrowStyle = createDiamondArrow("left", "#ff4747ff", "#ff2222");
    } else if (stepId === "27-1") {
      // Step 27: Total box - tooltip right, arrow left (instruction style)
      tooltipX = x + scaledWidth + 20 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("left");
    }
  } else if (position === "left") {
    if (stepId === 4) {
      // Step 4: Browse button - tooltip left, arrow right - instruction style
      tooltipX = x - 200 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else if (stepId === 9) {
      // Step 9: Select Bank Format border - tooltip left, arrow right - instruction style
      tooltipX = x - 170 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else if (stepId === 10) {
      // Step 10: Transaction row - tooltip left, arrow right - instruction style
      tooltipX = x - 200 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else if (stepId === 13) {
      // Step 13: Close button - tooltip left, arrow right - instruction style
      tooltipX = x - 150 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else if (stepId === 16) {
      // Step 16: OK button - tooltip left, arrow right - instruction style
      tooltipX = x - 180 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else if (stepId === 17) {
      // Step 17: Ledger Name column - tooltip left, arrow right
      tooltipX = x - 280 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else if (stepId === "17-2") {
      // Step 17-2: Ledger Name column - tooltip left, arrow right (note/warning style)
      tooltipX = x - 500 * scaleX;
      tooltipY = y + scaledHeight / 2 - 130 * scaleY;
      arrowStyle = createDiamondArrow("right", "#ff4747ff", "#ff2222");
    } else if (stepId === "17-3") {
      // Step 17-3: Ledger Name column - tooltip left, arrow right (instruction style)
      tooltipX = x - 315 * scaleX;
      tooltipY = y + scaledHeight / 2 + 40 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else if (stepId === 18) {
      // Step 18: Create Receipt /Payment Vouchers button - tooltip left with right arrow (instruction style)
      tooltipX = x - 250 * scaleX;
      tooltipY = y + scaledHeight / 2 - 15 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else if (stepId === "19-1") {
      // Step 19-1: Voucher created - tooltip left, arrow right (warning style)
      tooltipX = x - 115 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("right", "#ff4747ff", "#ff2222");
    } else if (stepId === "20-1") {
      // Step 20-1: Cash/Bank ledger - tooltip left, arrow right (warning style)
      tooltipX = x - 525 * scaleX;
      tooltipY = y + scaledHeight / 2 - 20 * scaleY;
      arrowStyle = createDiamondArrow("right", "#ff4747ff", "#ff2222");
    } else if (stepId === "21-2") {
      // Step 21-2: Contra voucher created - tooltip left, arrow right (instruction style)
      tooltipX = x - 520 * scaleX;
      tooltipY = y + scaledHeight / 2 + 10 * scaleY;
      arrowStyle = createDiamondArrow("right");
    } else {
      // Default left position (note/warning style)
      tooltipX = x + 65 * scaleX;
      tooltipY = y + 75 * scaleY;
      arrowStyle = createDiamondArrow("left", "#ff4747ff", "#ff2222");
    }
  }

  return (
    <div
      onClick={onNext}
      style={{
        position: "absolute",
        left: tooltipX,
        top: tooltipY,
        backgroundColor:
          (position === "left" &&
            stepId !== 4 &&
            stepId !== 9 &&
            stepId !== 10 &&
            stepId !== 13 &&
            stepId !== 16 &&
            stepId !== 18 &&
            stepId !== "17-3" &&
            stepId !== "21-2") ||
          (position === "right" && stepId === "17-1") ||
          (position === "right" && stepId === "21-1") ||
          (position === "left" && stepId === "19-1") ||
          (position === "left" && stepId === "20-1")
            ? "#ff4747ff"
            : "#fff3c4",
        color:
          (position === "left" &&
            stepId !== 4 &&
            stepId !== 9 &&
            stepId !== 10 &&
            stepId !== 13 &&
            stepId !== 16 &&
            stepId !== 18 &&
            stepId !== "17-3" &&
            stepId !== "21-2") ||
          (position === "right" && stepId === "17-1") ||
          (position === "right" && stepId === "21-1") ||
          (position === "left" && stepId === "19-1") ||
          (position === "left" && stepId === "20-1")
            ? "#fff"
            : "#5a4b00",
        padding: `${8 * scaleY}px ${12 * scaleX}px`,
        borderRadius: `${10 * scaleX}px`,
        fontSize: `${14 * scaleX}px`,
        fontWeight: "500",
        whiteSpace: "nowrap",
        zIndex: 51,
        border: `1px solid ${
          (position === "left" &&
            stepId !== 4 &&
            stepId !== 9 &&
            stepId !== 10 &&
            stepId !== 13 &&
            stepId !== 16 &&
            stepId !== 18 &&
            stepId !== "17-3" &&
            stepId !== "21-2") ||
          (position === "right" && stepId === "17-1") ||
          (position === "right" && stepId === "21-1") ||
          (position === "left" && stepId === "19-1") ||
          (position === "left" && stepId === "20-1")
            ? "#ff2222"
            : "#e6d289"
        }`,
        background:
          (position === "left" &&
            stepId !== 4 &&
            stepId !== 9 &&
            stepId !== 10 &&
            stepId !== 13 &&
            stepId !== 16 &&
            stepId !== 18 &&
            stepId !== "17-3" &&
            stepId !== "21-2") ||
          (position === "right" && stepId === "17-1") ||
          (position === "right" && stepId === "21-1") ||
          (position === "left" && stepId === "19-1") ||
          (position === "left" && stepId === "20-1")
            ? "#ff4747ff"
            : "#fff3c4",
        boxShadow: `0 ${4 * scaleY}px ${12 * scaleX}px rgba(0,0,0,0.15)`,
        animation:
          (position === "left" &&
            stepId !== 4 &&
            stepId !== 9 &&
            stepId !== 10 &&
            stepId !== 13 &&
            stepId !== 16 &&
            stepId !== 18 &&
            stepId !== "17-3" &&
            stepId !== "19-1" &&
            stepId !== "20-1" &&
            stepId !== "21-1" &&
            stepId !== "21-2") ||
          (position === "right" && stepId === "17-1")
            ? "tooltipFadeIn 2s ease-in-out forwards"
            : stepId === "19-2" ||
              stepId === "20-2" ||
              stepId === "21-1" ||
              stepId === "21-2"
            ? "none"
            : "fadeInFixed 2s ease-in-out forwards",
        letterSpacing: "0.2px",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = `0 ${6 * scaleY}px ${
          16 * scaleX
        }px rgba(0,0,0,0.25)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = `0 ${4 * scaleY}px ${
          12 * scaleX
        }px rgba(0,0,0,0.15)`;
      }}
    >
      {/* Diamond Arrow */}
      <div style={arrowStyle} />
      {text}
    </div>
  );
};

export default Tooltip;
