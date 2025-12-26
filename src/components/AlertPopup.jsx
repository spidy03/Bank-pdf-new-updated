import React, { useState, useEffect, useRef } from "react";
import AudioPlayer from "./AudioPlayer";

const AlertPopup = ({
  onNext,
  scaleX = 1,
  scaleY = 1,
  title = "AutoMapping Demo",
  message = "AutoMapping is a powerful tool that will help you organize data efficiently.",
  buttonText = "Start Demo",
  audioSrc = null,
  audioRef = null,
  shouldStartTyping = true,
  onTypingComplete = null,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const internalAudioRef = useRef(null);

  // Use provided audioRef or internal one
  const activeAudioRef = audioRef || internalAudioRef;

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typewriter effect for title - starts only when shouldStartTyping is true
  useEffect(() => {
    if (!title || !shouldStartTyping) return;

    setHasStartedTyping(true);
    let currentIndex = 0;
    const typingSpeed = 35; // milliseconds per character

    const typeNextCharacter = () => {
      if (currentIndex < title.length) {
        setDisplayedTitle(title.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextCharacter, typingSpeed);
      }
    };

    typeNextCharacter();
  }, [title, shouldStartTyping]);

  // Typewriter effect for message text - starts after title completes
  useEffect(() => {
    if (!message || !hasStartedTyping) return;

    let currentIndex = 0;
    const typingSpeed = 35; // milliseconds per character
    const titleDuration = title.length * 35; // Time it takes for title to complete

    const startMessageTimer = setTimeout(() => {
      // Start typewriter animation
      const typeNextCharacter = () => {
        if (currentIndex < message.length) {
          setDisplayedText(message.substring(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeNextCharacter, typingSpeed);
        } else {
          setIsTypingComplete(true);
        }
      };

      typeNextCharacter();
    }, titleDuration + 200); // Wait for title to finish + small delay

    return () => {
      clearTimeout(startMessageTimer);
    };
  }, [message, title, hasStartedTyping, shouldStartTyping]);

  // Call onTypingComplete callback when typing is done
  useEffect(() => {
    if (isTypingComplete && onTypingComplete) {
      onTypingComplete();
    }
  }, [isTypingComplete, onTypingComplete]);

  return (
    <>
      {/* Modern Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Backdrop Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 9998,
        }}
      />

      {/* Dialog Container */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: isMobile ? "calc(100vw - 32px)" : "auto",
          maxWidth: isMobile ? "420px" : "none",
        }}
      >
        {/* Main Dialog Box */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: isMobile
              ? "20px 16px"
              : `clamp(20px, ${28 * scaleY}px, 28px) clamp(24px, ${48 * scaleX}px, 48px)`,
            borderRadius: isMobile ? "12px" : `${16 * Math.min(scaleX, 1)}px`,
            boxShadow:
              "0 50px 150px rgba(59, 130, 246, 0.3), 0 20px 60px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            width: isMobile ? "100%" : `min(${720 * scaleX}px, 720px)`,
            maxWidth: "90vw",
            maxHeight: isMobile ? "85vh" : "90vh",
            overflowY: "auto",
            border: "2px solid rgba(59, 130, 246, 0.15)",
            position: "relative",
            overflow: "hidden",
            animation: "fadeInScale 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backdropFilter: "blur(20px)",
            boxSizing: "border-box",
          }}
        >
          {/* Animated gradient background orbs */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              right: "-25%",
              width: "450px",
              height: "450px",
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "float 15s ease-in-out infinite",
              pointerEvents: "none",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-40%",
              left: "-20%",
              width: "380px",
              height: "380px",
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "float 18s ease-in-out infinite reverse",
              pointerEvents: "none",
              filter: "blur(40px)",
            }}
          />

          {/* Gradient overlay effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background:
                "linear-gradient(90deg, transparent 0%, #3b82f6 25%, #8b5cf6 50%, #3b82f6 75%, transparent 100%)",
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 2 }}>
            {/* Premium badge with icon */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: isMobile ? "6px" : `${8 * scaleX}px`,
                padding: isMobile ? "6px 14px" : `${8 * scaleY}px ${20 * scaleX}px`,
                borderRadius: `${30 * scaleX}px`,
                background:
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.1) 100%)",
                border: "2px solid rgba(59, 130, 246, 0.2)",
                marginBottom: isMobile ? "16px" : `${32 * scaleY}px`,
                animation: "fadeInUp 0.8s ease-out 0.1s both",
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.1)",
              }}
            >
              <span style={{ fontSize: isMobile ? "14px" : `${16 * scaleX}px` }}>🚀</span>
              <span
                style={{
                  fontSize: isMobile ? "10px" : `${13 * scaleX}px`,
                  fontWeight: "700",
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Welcome to TallyConnects
              </span>
            </div>

            {/* Title - Premium typography with typewriter animation */}
            <h2
              style={{
                fontSize: isMobile ? "20px" : `clamp(22px, ${32 * scaleX}px, 32px)`,
                fontWeight: "700",
                background: "linear-gradient(135deg, #015c9a 0%, #0284c7 50%, #0369a1 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                margin: isMobile ? "0 0 16px 0" : `0 0 clamp(16px, ${24 * scaleY}px, 24px) 0`,
                fontFamily: "'Outfit', sans-serif",
                lineHeight: "1.2",
                letterSpacing: "-1px",
                animation: "fadeInUp 0.8s ease-out 0.15s both",
                minHeight: isMobile ? "auto" : `clamp(26px, ${32 * scaleX * 1.2}px, 38px)`,
                textShadow: "0 4px 20px rgba(1, 92, 154, 0.1))",
              }}
            >
              {displayedTitle}
              {displayedTitle.length < title.length && (
                <span
                  style={{ marginLeft: "2px", animation: "blink 1s infinite" }}
                >
                  |
                </span>
              )}
            </h2>

            {/* Divider - Premium animated line */}
            <div
              style={{
                width: isMobile ? "60px" : "100px",
                height: isMobile ? "4px" : "5px",
                margin: isMobile ? "0 auto 16px" : `0 auto ${28 * scaleY}px`,
                borderRadius: "4px",
                background:
                  "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)",
                backgroundSize: "200% 100%",
                animation: "slideGradient 4s ease-in-out infinite",
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.35)",
              }}
            />

            {/* Message Text - Premium typography with typewriter animation */}
            <p
              style={{
                fontSize: isMobile ? "14px" : `clamp(14px, ${17 * scaleX}px, 17px)`,
                fontWeight: "400",
                color: "#475569",
                margin: isMobile ? "0 0 16px 0" : `0 0 clamp(16px, ${24 * scaleY}px, 24px) 0`,
                lineHeight: "1.7",
                fontFamily: "'Inter', sans-serif",
                whiteSpace: "pre-wrap",
                textAlign: "left",
                animation: "fadeInUp 0.8s ease-out 0.2s both",
                letterSpacing: "0.2px",
                minHeight: isMobile ? "auto" : "auto",
                padding: "0",
              }}
            >
              {displayedText}
              {!isTypingComplete && (
                <span style={{ marginLeft: "2px" }}>|</span>
              )}
            </p>

            {/* Audio Player - Conditional rendering for Step 1 */}
            {audioSrc && (
              <div style={{ marginBottom: `${24 * scaleY}px` }}>
                <AudioPlayer
                  ref={activeAudioRef}
                  src={audioSrc}
                  autoPlay={false}
                  showMinimalUI={true}
                  scaleX={scaleX}
                  scaleY={scaleY}
                />


              </div>
            )}

            {/* Button - Premium Large Stylish Design */}
            <button
              onClick={onNext}
              disabled={!isTypingComplete}
              style={{
                cursor: !isTypingComplete ? "not-allowed" : "pointer",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: !isTypingComplete
                  ? "linear-gradient(0deg, #9ca3af, #9ca3af)"
                  : `radial-gradient(65.28% 65.28% at 50% 100%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%), linear-gradient(0deg, #7a5af8, #7a5af8)`,
                borderRadius: "1rem",
                border: "none",
                outline: "none",
                padding: isMobile
                  ? "14px 32px"
                  : `clamp(12px, ${18 * scaleY}px, 18px) clamp(28px, ${48 * scaleX}px, 48px)`,
                opacity: !isTypingComplete ? 0.6 : 1,
                animation: "fadeInUp 0.8s ease-out 0.3s both",
                boxShadow: !isTypingComplete ? "none" : "0 10px 40px rgba(122, 90, 248, 0.4), 0 4px 15px rgba(122, 90, 248, 0.3)",
                transition: "all 0.3s ease",
                minHeight: "48px",
                width: isMobile ? "100%" : "auto",
              }}
            >
              {/* Button before pseudo-element effect */}
              <span
                style={{
                  position: "absolute",
                  inset: "1px",
                  borderRadius: "calc(0.75rem - 1px)",
                  zIndex: 0,
                  background: "linear-gradient(177.95deg, rgba(255, 255, 255, 0.19) 0%, rgba(255, 255, 255, 0) 100%)",
                }}
              />
              {/* Button after pseudo-element effect */}
              <span
                style={{
                  position: "absolute",
                  inset: "2px",
                  borderRadius: "calc(0.75rem - 2px)",
                  zIndex: 0,
                  background: !isTypingComplete
                    ? "linear-gradient(0deg, #9ca3af, #9ca3af)"
                    : `radial-gradient(65.28% 65.28% at 50% 100%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%), linear-gradient(0deg, #7a5af8, #7a5af8)`,
                }}
              />

              {/* Floating points wrapper */}
              <span
                style={{
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  position: "absolute",
                  zIndex: 1,
                }}
              >
                {[10, 30, 25, 44, 50, 75, 88, 58, 98, 65].map((left, i) => (
                  <span
                    key={i}
                    style={{
                      bottom: "-10px",
                      position: "absolute",
                      left: `${left}%`,
                      pointerEvents: "none",
                      width: "2px",
                      height: "2px",
                      backgroundColor: "#fff",
                      borderRadius: "9999px",
                      animation: `floating-points ${1.5 + i * 0.1}s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                      opacity: 0.6 + (i % 4) * 0.1,
                    }}
                  />
                ))}
              </span>

              {/* Inner content */}
              <span
                style={{
                  zIndex: 2,
                  gap: "10px",
                  position: "relative",
                  width: "100%",
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isMobile ? "15px" : `clamp(14px, ${20 * scaleX}px, 20px)`,
                  fontWeight: "700",
                  lineHeight: 1.5,
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                {buttonText}
                <svg
                  style={{
                    width: "22px",
                    height: "22px",
                    fill: "white",
                  }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </span>
            </button>


            {/* Subtle hint - Premium - hide on mobile to save space */}
            {!isMobile && (
              <p
                style={{
                  fontSize: `${13 * scaleX}px`,
                  color: "#94a3b8",
                  marginTop: `${24 * scaleY}px`,
                  fontFamily: "'Inter', sans-serif",
                  animation: "fadeInUp 0.8s ease-out 0.4s both",
                  letterSpacing: "0.5px",
                  fontWeight: "500",
                }}
              >
                💡 Press Enter or click the button to continue
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-30px) translateX(15px);
          }
          50% {
            transform: translateY(-50px) translateX(-10px);
          }
          75% {
            transform: translateY(-25px) translateX(20px);
          }
        }

        @keyframes slideGradient {
          0%, 100% {
            backgroundPosition: 0% center;
          }
          50% {
            backgroundPosition: 100% center;
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes shimmerButton {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes glow {
          0%, 100% {
            boxShadow: 0 0 20px rgba(59, 130, 246, 0.4);
          }
          50% {
            boxShadow: 0 0 40px rgba(99, 102, 241, 0.6);
          }
        }

        @keyframes floating-points {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          85% {
            opacity: 0;
          }
          100% {
            transform: translateY(-55px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};

export default AlertPopup;
