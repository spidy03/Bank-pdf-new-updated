import React, { useState, useEffect } from "react";
import FormComponent from "./FormComponent";

const CompletionBanner = ({ scaleX = 1, scaleY = 1, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const congratsTitle = "Congratulations!";
  const congratsDesc = "You've successfully completed the Bank PDF Demo! You've learned how to import your PDF bank statements directly into TallyPrime, saving time with automatic data extraction.";

  // Auto-show form after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      window.location.href = "https://tallyconnects.com";
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: window.innerWidth < 768 ? "16px" : "24px",
        boxSizing: "border-box",
        overflow: "hidden",
        transition: "all 0.8s ease",
      }}
    >
      {/* Dark overlay for better contrast - clicking it goes back */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
          cursor: "pointer",
        }}
      />
      {/* Dialog Container */}
      <div
        style={{
          position: "relative",
          zIndex: 100,
          width: "100%",
          maxWidth: showForm && !submitted && !isClosing ? "420px" : "480px",
          margin: "auto",
        }}
      >
        {/* Main Dialog Box */}
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: window.innerWidth < 768
              ? "24px 20px"
              : showForm && !submitted && !isClosing
                ? "28px 32px"
                : "36px 44px",
            borderRadius: window.innerWidth < 768 ? "16px" : "20px",
            boxShadow:
              "0 40px 120px rgba(59, 130, 246, 0.25), 0 15px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            textAlign: "center",
            width: "100%",
            maxWidth: "100%",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            position: "relative",
            animation: "fadeInScale 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
            backdropFilter: "blur(20px)",
            boxSizing: "border-box",
            overflow: "hidden",
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
              animation: "float 20s ease-in-out infinite reverse",
              pointerEvents: "none",
              filter: "blur(40px)",
            }}
          />
          {/* Third orb for extra depth */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "-30%",
              width: "300px",
              height: "300px",
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "float 18s ease-in-out infinite",
              pointerEvents: "none",
              filter: "blur(50px)",
            }}
          />

          {/* Close Button */}
          {showForm && !submitted && !isClosing && (
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "rgba(0, 0, 0, 0.05)",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#9ca3af",
                transition: "all 0.3s ease",
                zIndex: 10,
                padding: "6px 10px",
                borderRadius: "8px",
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#1f2937";
                e.target.style.background = "rgba(0, 0, 0, 0.1)";
                e.target.style.transform = "rotate(90deg)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#9ca3af";
                e.target.style.background = "rgba(0, 0, 0, 0.05)";
                e.target.style.transform = "rotate(0deg)";
              }}
            >
              ✕
            </button>
          )}

          <div style={{ position: "relative", zIndex: 2 }}>
            {!submitted && !isClosing ? (
              showForm ? (
                // Form Screen
                <>
                  <FormComponent
                    onSubmit={(data) => {
                      setSubmitted(true);
                      setTimeout(() => {
                        window.location.href = "https://tallyconnects.com";
                      }, 3000);
                    }}
                  />
                </>
              ) : (
                // Congratulations Screen - Matching WelcomeScreen Style with Typewriter
                <>
                  {/* Icon */}
                  <div
                    style={{
                      fontSize: window.innerWidth < 768 ? "36px" : "clamp(40px, 8vw, 56px)",
                      marginBottom: window.innerWidth < 768 ? "12px" : "clamp(16px, 3vw, 24px)",
                      animation: "bounce 0.8s ease-out",
                    }}
                  >
                    🏆
                  </div>

                  {/* Badge/Tag - Like WelcomeScreen */}
                  <div
                    style={{
                      display: "inline-block",
                      padding: window.innerWidth < 768 ? "5px 12px" : "clamp(6px, 1.5vw, 8px) clamp(14px, 3vw, 20px)",
                      background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
                      borderRadius: "25px",
                      marginBottom: window.innerWidth < 768 ? "10px" : "clamp(14px, 3vw, 20px)",
                      animation: "fadeInUp 0.8s ease-out 0.1s both",
                      border: "1px solid rgba(99, 102, 241, 0.25)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "clamp(9px, 1.8vw, 11px)",
                        fontWeight: "700",
                        background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      🎉 Demo Complete
                    </span>
                  </div>

                  {/* Title */}
                  <h1
                    style={{
                      fontSize: "clamp(24px, 5vw, 36px)",
                      fontWeight: "800",
                      color: "#1f2937",
                      margin: "0 0 clamp(10px, 2vw, 16px) 0",
                      fontFamily: "'Outfit', sans-serif",
                      animation: "fadeInUp 0.8s ease-out 0.2s both",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {congratsTitle}
                  </h1>

                  {/* Underline accent */}
                  <div
                    style={{
                      width: "80px",
                      height: "4px",
                      background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                      borderRadius: "2px",
                      margin: "0 auto 20px auto",
                      animation: "fadeInUp 0.8s ease-out 0.25s both",
                    }}
                  />

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "clamp(13px, 2.5vw, 16px)",
                      color: "#4b5563",
                      lineHeight: "1.8",
                      margin: "clamp(16px, 3vw, 24px) 0 clamp(20px, 4vw, 28px) 0",
                      fontFamily: "'Inter', sans-serif",
                      animation: "fadeInUp 0.8s ease-out 0.3s both",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {congratsDesc}
                  </p>

                  {/* Loading indicator */}
                  <div
                    style={{
                      animation: "fadeInUp 0.8s ease-out 0.4s both",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#9ca3af",
                        margin: "0",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: "500",
                        letterSpacing: "0.3px",
                      }}
                    >
                      Preparing your details form
                      <span style={{ animation: "pulse 1.4s infinite", display: "inline-block" }}>.</span>
                      <span style={{ animation: "pulse 1.4s infinite 0.2s", display: "inline-block" }}>.</span>
                      <span style={{ animation: "pulse 1.4s infinite 0.4s", display: "inline-block" }}>.</span>
                    </p>
                  </div>
                </>
              )
            ) : (
              // Success/Closing Screen - Premium Design
              <>
                {/* Icon */}
                <div
                  style={{
                    fontSize: "clamp(48px, 10vw, 64px)",
                    marginBottom: "clamp(16px, 3vw, 24px)",
                    animation: "scaleIn 0.6s ease-out",
                  }}
                >
                  {submitted ? "✅" : "🚀"}
                </div>

                {/* Title with Gradient */}
                <h1
                  style={{
                    fontSize: "clamp(24px, 5vw, 36px)",
                    fontWeight: "800",
                    background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    margin: "0 0 clamp(8px, 1.5vw, 12px) 0",
                    fontFamily: "'Outfit', sans-serif",
                    animation: "fadeInUp 0.8s ease-out 0.2s both",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {submitted ? "Thank You!" : "Redirecting..."}
                </h1>

                {/* Underline accent */}
                <div
                  style={{
                    width: "60px",
                    height: "4px",
                    background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                    borderRadius: "2px",
                    margin: "0 auto 20px auto",
                    animation: "fadeInUp 0.8s ease-out 0.25s both",
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontSize: "clamp(13px, 2.5vw, 16px)",
                    color: "#4b5563",
                    lineHeight: "1.8",
                    margin: "clamp(14px, 3vw, 20px) 0 clamp(20px, 4vw, 28px) 0",
                    fontFamily: "'Inter', sans-serif",
                    animation: "fadeInUp 0.8s ease-out 0.3s both",
                    letterSpacing: "0.3px",
                  }}
                >
                  {submitted
                    ? "Your details have been submitted successfully!"
                    : "Taking you to TallyConnects..."}
                </p>

                {/* Redirect info */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    background: "rgba(99, 102, 241, 0.08)",
                    borderRadius: "10px",
                    animation: "fadeInUp 0.8s ease-out 0.4s both",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      background: "#6366f1",
                      borderRadius: "50%",
                      animation: "pulse 1s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#6366f1",
                      fontWeight: "600",
                      fontFamily: "'Inter', sans-serif",
                      letterSpacing: "0.3px",
                    }}
                  >
                    Redirecting to TallyConnects website
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    marginTop: "28px",
                    animation: "fadeInUp 0.8s ease-out 0.5s both",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "4px",
                      background: "rgba(99, 102, 241, 0.15)",
                      borderRadius: "2px",
                      margin: "0 auto",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        background: "linear-gradient(90deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                        borderRadius: "2px",
                        animation: "progressBar 2s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Animations - Matching WelcomeScreen */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

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

        @keyframes smoothBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes shimmerButton {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 60%, 100% {
            opacity: 0.3;
          }
          30% {
            opacity: 1;
          }
        }

        @keyframes progressBar {
          0% {
            width: 0%;
            margin-left: 0;
          }
          50% {
            width: 100%;
            margin-left: 0;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default CompletionBanner;
