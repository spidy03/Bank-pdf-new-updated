import React, { useEffect, useState } from "react";

const CompletionBanner = ({ scaleX = 1, scaleY = 1 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 50);

    // Redirect to website after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = "https://tallyconnects.com/";
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 50%, #2d1b4e 100%)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        animation: "slideInComplete 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        overflow: "hidden",
      }}
    >
      {/* Animated background gradient overlay */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.15) 0%, transparent 50%)",
          animation: "gradientShift 8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Floating orbs - optimized for performance */}
      <div
        style={{
          position: "absolute",
          width: Math.min(400, window.innerWidth * 0.4),
          height: Math.min(400, window.innerWidth * 0.4),
          background:
            "radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-200px",
          left: "-200px",
          animation: "float 12s ease-in-out infinite",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: Math.min(300, window.innerWidth * 0.3),
          height: Math.min(300, window.innerWidth * 0.3),
          background:
            "radial-gradient(circle, rgba(255, 107, 157, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "-150px",
          right: "-150px",
          animation: "float 15s ease-in-out infinite reverse",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Optimized confetti - reduced count for better performance */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`confetti-${i}`}
          style={{
            position: "absolute",
            width: `${Math.random() * 8 + 3}px`,
            height: `${Math.random() * 8 + 3}px`,
            background: ["#FFD700", "#FF6B9D", "#00D4FF", "#667eea"][i % 4],
            borderRadius: `${i % 2 === 0 ? "50%" : "2px"}`,
            top: "-50px",
            left: `${Math.random() * 100}%`,
            animation: `confetti ${Math.random() * 2.5 + 2}s ease-in forwards`,
            animationDelay: `${(i * 0.1) % 0.8}s`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Main content container - Responsive */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          color: "#ffffff",
          animation:
            "contentZoom 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both",
          maxWidth: "90vw",
          width: "100%",
          padding: window.innerWidth < 640 ? "40px 20px" : "60px 40px",
          boxSizing: "border-box",
        }}
      >
        {/* Trophy icon with glow */}
        <div
          style={{
            fontSize: window.innerWidth < 640 ? "80px" : "120px",
            marginBottom: window.innerWidth < 640 ? "20px" : "30px",
            animation: "bounceIconPremium 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            filter: "drop-shadow(0 0 20px rgba(102, 126, 234, 0.6))",
            lineHeight: "1",
          }}
        >
          🏆
        </div>

        {/* Main heading with gradient */}
        <h1
          style={{
            fontSize:
              window.innerWidth < 640
                ? "40px"
                : window.innerWidth < 1024
                ? "56px"
                : "68px",
            fontWeight: "900",
            margin: "0 0 10px 0",
            letterSpacing: "-1px",
            background:
              "linear-gradient(135deg, #00D4FF 0%, #667eea 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "slideInUp 1s ease-out 0.3s both",
          }}
        >
          Congratulations!
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: window.innerWidth < 640 ? "16px" : "20px",
            fontWeight: "500",
            margin: window.innerWidth < 640 ? "15px 0 35px 0" : "20px 0 50px 0",
            opacity: 0.9,
            color: "#e0e0ff",
            animation: "slideInUp 1s ease-out 0.4s both",
          }}
        >
          You've Successfully Completed
        </p>

        {/* Premium badge */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(102, 126, 234, 0.4)",
            borderRadius: "20px",
            padding: window.innerWidth < 640 ? "30px 20px" : "40px 30px",
            marginBottom: window.innerWidth < 640 ? "35px" : "60px",
            animation:
              "slideInUp 1s ease-out 0.5s both, glow 3s ease-in-out infinite 1s",
            boxShadow:
              "0 0 40px rgba(102, 126, 234, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shine effect */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              animation: "shine 3s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          {/* Badge content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontSize: window.innerWidth < 640 ? "12px" : "16px",
                fontWeight: "600",
                color: "#00D4FF",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "10px",
                opacity: 0.9,
              }}
            >
              ✨ Premium Demo
            </div>

            <div
              style={{
                fontSize:
                  window.innerWidth < 640
                    ? "32px"
                    : window.innerWidth < 1024
                    ? "44px"
                    : "52px",
                fontWeight: "900",
                margin: "8px 0",
                background:
                  "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B9D 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.5px",
                animation: "titleGlow 2s ease-in-out infinite 0.5s",
                lineHeight: "1.2",
              }}
            >
              Bank PDF Demo
            </div>

            <div
              style={{
                fontSize: window.innerWidth < 640 ? "13px" : "18px",
                margin: "10px 0 0 0",
                opacity: 0.85,
                background: "linear-gradient(135deg, #00D4FF 0%, #667eea 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Interactive Demo Experience Complete
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div
          style={{
            width: "100%",
            maxWidth: "500px",
            marginBottom: window.innerWidth < 640 ? "30px" : "50px",
            marginLeft: "auto",
            marginRight: "auto",
            animation: "slideInUp 1s ease-out 0.6s both",
            padding: "0 15px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: window.innerWidth < 640 ? "12px" : "14px",
              color: "#00D4FF",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Redirecting in {Math.ceil((5000 - (Date.now() % 5000)) / 1000)}s
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "rgba(102, 126, 234, 0.2)",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid rgba(102, 126, 234, 0.4)",
            }}
          >
            <div
              style={{
                height: "100%",
                background:
                  "linear-gradient(90deg, #00D4FF 0%, #667eea 50%, #FFD700 100%)",
                width: `${progress}%`,
                transition: "width 0.1s linear",
                borderRadius: "10px",
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.8)",
              }}
            />
          </div>
        </div>

        {/* Footer message */}
        <p
          style={{
            fontSize: window.innerWidth < 640 ? "14px" : "16px",
            opacity: 0.75,
            margin: 0,
            letterSpacing: "0.5px",
            animation: "fadeIn 1s ease-out 0.7s both",
            background: "linear-gradient(135deg, #667eea 0%, #00D4FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🚀 Launching Tally Connects...
        </p>
      </div>

      <style>{`
        @keyframes slideInComplete {
          from {
            opacity: 0;
            transform: scale(0.9) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
          }
        }

        @keyframes contentZoom {
          from {
            opacity: 0;
            transform: scale(0.7) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes bounceIconPremium {
          0% {
            transform: scale(0) translateY(-60px) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.15) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%, 100% {
            boxShadow: 0 0 40px rgba(102, 126, 234, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2);
          }
          50% {
            boxShadow: 0 0 60px rgba(102, 126, 234, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes titleGlow {
          0%, 100% {
            textShadow: 0 0 20px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 107, 157, 0.1);
          }
          50% {
            textShadow: 0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 107, 157, 0.3);
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          50% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes confetti {
          to {
            transform: translateY(100vh) rotate(360deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-50px) translateX(30px);
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @media (max-width: 640px) {
          h1 {
            font-size: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CompletionBanner;
