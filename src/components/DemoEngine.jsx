import React, { useEffect, useState, useRef } from "react";
import demoSteps from "../data/demoSteps";
import HighlightBox from "./HighlightBox";
import BorderHighlight from "./BorderHighlight";
import Tooltip from "./Tooltip";
import AlertPopup from "./AlertPopup";
import AudioChoiceNotification from "./AudioChoiceNotification";
import CompletionBanner from "./CompletionBanner";
import NavigationBar from "./NavigationBar";
import SpotlightOverlay from "./SpotlightOverlay";
import InstructionCard from "./InstructionCard";

const DemoEngine = () => {
  const [currentStep, setCurrentStep] = useState(demoSteps[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [inactivityTimeout, setInactivityTimeout] = useState(null);
  const [containerRef, setContainerRef] = useState(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [showTooltip1, setShowTooltip1] = useState(false);
  const [showTooltip2, setShowTooltip2] = useState(false);
  const [showTooltip3, setShowTooltip3] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  // Step 0 audio choice and typing states
  const [step0AudioChoiceMade, setStep0AudioChoiceMade] = useState(false);
  const [allowAlertTyping, setAllowAlertTyping] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const audioRef = useRef(null);

  // Advanced frame controls state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showKeyboardHints, setShowKeyboardHints] = useState(false);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Touch gesture support
  const touchStartX = useRef(null);
  const previousStepRef = useRef(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Track audio playing state
  useEffect(() => {
    const handlePlay = () => setIsAudioPlaying(true);
    const handlePause = () => setIsAudioPlaying(false);
    const handleEnded = () => setIsAudioPlaying(false);

    // Use a small delay to ensure audio element is mounted
    const checkAudioInterval = setInterval(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);
        clearInterval(checkAudioInterval);
      }
    }, 100);

    // Cleanup after 2 seconds if audio never mounts
    const timeout = setTimeout(() => {
      clearInterval(checkAudioInterval);
    }, 2000);

    return () => {
      clearInterval(checkAudioInterval);
      clearTimeout(timeout);
      const audio = audioRef.current;
      if (audio) {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentStep]);

  // Toggle functions
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.log(err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.log(err));
    }
  };

  // Toggle audio play/pause
  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) {
      console.warn("Audio element not ready yet");
      return;
    }

    if (audio.paused) {
      audio.play()
        .then(() => {
          setIsAudioPlaying(true);
        })
        .catch(err => {
          console.error("Audio play failed:", err);
          setIsAudioPlaying(false);
        });
    } else {
      audio.pause();
      setIsAudioPlaying(false);
    }
  };

  const restartDemo = () => {
    if (window.confirm("Are you sure you want to restart the demo?")) {
      // Stop any playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Reset all UI states
      setShowCompletion(false);
      setShowBubble(false);
      setShowTooltip1(false);
      setShowTooltip2(false);
      setShowTooltip3(false);
      setShowKeyboardHints(false);
      setShowCopyNotification(false);
      setIsAudioPlaying(false);
      setStep0AudioChoiceMade(false);
      setAllowAlertTyping(false);
      setIsTypingComplete(false);

      // Return to Step 0 with fresh copy
      setCurrentStep({ ...demoSteps[0] });

      // Update URL
      window.history.replaceState({ stepId: 1 }, "", "?step=1");
    }
  };

  const toggleKeyboardHints = () => {
    setShowKeyboardHints(!showKeyboardHints);
  };

  // Touch gesture support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const threshold = 50;

    // Swipe left = next, swipe right = previous
    if (diff > threshold && currentStep.id !== demoSteps.length && !showCompletion) {
      goNext();
    } else if (diff < -threshold && currentStep.id !== 1) {
      goPrevious();
    }

    touchStartX.current = null;
  };

  // Initialize history state on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stepId = urlParams.get("step");

    if (stepId) {
      const step = demoSteps.find((s) => s.id === Number(stepId));
      if (step) {
        setCurrentStep(step);
        // Replace current history state with correct step
        window.history.replaceState(
          { stepId: step.id },
          "",
          `?step=${step.id}`
        );
      }
    } else {
      // Set initial history state for first step
      window.history.replaceState({ stepId: 1 }, "", "?step=1");
    }
  }, []);

  useEffect(() => {
    // reset bubble then show after configured delay
    setShowBubble(false);
    setShowTooltip1(false);
    setShowTooltip2(false);
    setShowTooltip3(false);

    // Reset Step 0 states when returning to step 0
    if (currentStep.id === 0) {
      setStep0AudioChoiceMade(false);
      setAllowAlertTyping(false);
      setIsTypingComplete(false);
      // Stop and reset audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsAudioPlaying(false);
      }
    }

    const t = setTimeout(() => setShowBubble(true), currentStep.delay);
    return () => clearTimeout(t);
  }, [currentStep]);

  // Auto-manage per-step audio: pause prior audio and autoplay when a step defines audioSrc (except step 0 which is opt-in)
  useEffect(() => {
    const prevStep = previousStepRef.current;
    const audio = audioRef.current;
    let playTimeout;

    // Pause audio from the previous step if we left it
    if (audio && prevStep && prevStep.audioSrc && prevStep.id !== currentStep.id) {
      audio.pause();
      audio.currentTime = 0;
      setIsAudioPlaying(false);
    }

    // Autoplay for steps with audio (excluding step 0 which uses the welcome choice flow)
    if (audio && currentStep.audioSrc && currentStep.id !== 0) {
      const targetSrc = `${currentStep.audioSrc}?v=${currentStep.id}`;
      const currentSrc = audio.src || "";
      const needsSrcUpdate = !currentSrc.includes(targetSrc);
      if (needsSrcUpdate) {
        audio.src = targetSrc;
        audio.load();
      }

      // Align audio start with the visual delay for Step 1 so narration and UI appear together
      const delayBeforePlay = currentStep.id === 1 ? (currentStep.delay || 0) : 0;
      playTimeout = setTimeout(() => {
        audio
          .play()
          .then(() => setIsAudioPlaying(true))
          .catch((err) => {
            console.error("Audio autoplay failed:", err);
            setIsAudioPlaying(false);
          });
      }, delayBeforePlay);
    } else if (!currentStep.audioSrc) {
      setIsAudioPlaying(false);
    }

    previousStepRef.current = currentStep;
    return () => {
      if (playTimeout) clearTimeout(playTimeout);
    };
  }, [currentStep]);

  // Step 17 tooltip timing
  useEffect(() => {
    if (currentStep.id !== 17 || !showBubble) return;

    // Show tooltip 1 immediately
    setShowTooltip1(true);

    // Show tooltip 2 after 2.5 seconds
    const t2 = setTimeout(() => {
      setShowTooltip2(true);
    }, 2500);

    // Show tooltip 3 after 5 seconds
    const t3 = setTimeout(() => {
      setShowTooltip3(true);
    }, 5000);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentStep, showBubble]);

  // Auto-advance after 10 seconds of inactivity
  useEffect(() => {
    if (!showBubble) {
      // Clear timeout if bubble is hidden
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
        setInactivityTimeout(null);
      }
      return;
    }

    // Set 10-second timeout to auto-advance
    const timeout = setTimeout(() => {
      goNext();
    }, 1000000);

    setInactivityTimeout(timeout);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBubble, currentStep]);

  const goNext = () => {
    // Clear inactivity timeout when user clicks
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
      setInactivityTimeout(null);
    }

    const currentStepIndex = demoSteps.findIndex(
      (step) => step.id === currentStep.id
    );
    if (currentStepIndex < demoSteps.length - 1) {
      const next = demoSteps[currentStepIndex + 1];
      // hide current UI, navigate, push history so Back/Forward work
      setShowBubble(false);
      setCurrentStep(next);
      try {
        window.history.pushState({ stepId: next.id }, "", `?step=${next.id}`);
      } catch (e) {
        /* ignore */
      }
    } else {
      // Show completion banner when demo is finished
      setShowCompletion(true);
    }
  };

  const goPrevious = () => {
    // Clear inactivity timeout when user clicks
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
      setInactivityTimeout(null);
    }

    const currentStepIndex = demoSteps.findIndex(
      (step) => step.id === currentStep.id
    );
    if (currentStepIndex > 0) {
      const previous = demoSteps[currentStepIndex - 1];
      // hide current UI, navigate, push history so Back/Forward work
      setShowBubble(false);
      setCurrentStep(previous);
      try {
        window.history.pushState(
          { stepId: previous.id },
          "",
          `?step=${previous.id}`
        );
      } catch (e) {
        /* ignore */
      }
    }
  };

  // Handle Back/Forward browser navigation
  useEffect(() => {
    const handlePopState = (ev) => {
      // Get stepId from history state first, then from URL
      let stepId = ev.state?.stepId;

      if (!stepId) {
        const urlParams = new URLSearchParams(window.location.search);
        stepId = urlParams.get("step");
        if (stepId) stepId = Number(stepId);
      }

      if (stepId) {
        const step = demoSteps.find((d) => d.id === stepId);
        if (step) {
          setShowBubble(false);
          setCurrentStep(step);
          // Ensure history state is correct
          window.history.replaceState(
            { stepId: step.id },
            "",
            `?step=${step.id}`
          );
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Enhanced keyboard navigation with fullscreen, restart, and more shortcuts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Fullscreen - F key (always available)
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // Restart - R key
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        restartDemo();
        return;
      }

      // Audio toggle - Space key
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        toggleAudio();
        return;
      }

      // Keyboard hints - ? key
      if (e.key === "?") {
        e.preventDefault();
        toggleKeyboardHints();
        return;
      }

      // Block navigation if completion showing
      if (showCompletion) return;

      const currentStepIndex = demoSteps.findIndex(s => s.id === currentStep.id);

      // Next - Right Arrow or Enter
      if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        if (currentStepIndex < demoSteps.length - 1) {
          goNext();
        }
        return;
      }

      // Previous - Left Arrow or Backspace
      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        if (currentStep.id !== 0) {
          goPrevious();
        }
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, showCompletion, isFullscreen]);

  // small horizontal adjustment to shift highlight/notification slightly left
  const H = currentStep.highlight || { x: 0, y: 0, width: 0, height: 0 };
  const SHIFT_LEFT = 0; // No shift needed with new positioning

  // Calculate current step index for display
  const currentStepIndex = demoSteps.findIndex(s => s.id === currentStep.id);

  // Calculate scaled positions based on original image dimensions
  const originalWidth = currentStep.imageWidth || 1280;
  const originalHeight = currentStep.imageHeight || 720;

  // Use imageWidth/imageHeight state which gets updated on load
  const scaleX = imageWidth > 0 ? imageWidth / originalWidth : 1;
  const scaleY = imageHeight > 0 ? imageHeight / originalHeight : 1;

  const adjHighlight = {
    x: Math.max(0, H.x * scaleX - SHIFT_LEFT),
    y: H.y * scaleY,
    width: H.width * scaleX,
    height: H.height * scaleY,
  };

  // For step 2, handle expiration date highlight
  const expHighlight = currentStep.expirationHighlight || null;
  const adjExpHighlight = expHighlight
    ? {
      x: Math.max(0, expHighlight.x * scaleX),
      y: expHighlight.y * scaleY,
      width: expHighlight.width * scaleX,
      height: expHighlight.height * scaleY,
    }
    : null;

  // For step 17, handle dual highlights (left and right)
  const highlightLeft = currentStep.highlightLeft || null;
  const adjHighlightLeft = highlightLeft
    ? {
      x: Math.max(0, highlightLeft.x * scaleX),
      y: highlightLeft.y * scaleY,
      width: highlightLeft.width * scaleX,
      height: highlightLeft.height * scaleY,
    }
    : null;

  const highlightRight = currentStep.highlightRight || null;
  const adjHighlightRight = highlightRight
    ? {
      x: Math.max(0, highlightRight.x * scaleX),
      y: highlightRight.y * scaleY,
      width: highlightRight.width * scaleX,
      height: highlightRight.height * scaleY,
    }
    : null;

  // Calculate actual image dimensions when image loads
  const handleImageLoad = (event) => {
    const img = event.target;
    if (img) {
      // Get the actual rendered dimensions (not natural)
      setImageWidth(img.offsetWidth);
      setImageHeight(img.offsetHeight);
    }
  };

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef) {
        const img = containerRef.querySelector("img");
        if (img) {
          setImageWidth(img.offsetWidth);
          setImageHeight(img.offsetHeight);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    // Also trigger on orientation change
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [containerRef]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif",
      }}
    >
      {/* Hidden audio element for steps with narration (non-step-0); step 0 uses AlertPopup's audio rendering */}
      {currentStep.id !== 0 && currentStep.audioSrc && (
        <audio
          ref={audioRef}
          src={`${currentStep.audioSrc}?v=${currentStep.id}`}
          preload="auto"
          style={{ display: "none" }}
        />
      )}

      {/* TallyConnect Logo - Top Left (Responsive to fullscreen and mobile) */}
      <img
        src="/TallyConnect-Logo.png"
        alt="TallyConnect Logo"
        onClick={() => window.open("https://tallyconnects.com/", "_blank")}
        style={{
          position: "absolute",
          top: isMobile ? "8px" : (isFullscreen ? "12px" : "20px"),
          left: isMobile ? "10px" : (isFullscreen ? "15px" : "20px"),
          height: isMobile ? "32px" : (isFullscreen ? "40px" : "50px"),
          width: "auto",
          cursor: "pointer",
          zIndex: 200,
          transition: "all 0.3s ease",
        }}
      />

      {/* Browser Frame Wrapper - Contains both bar and image */}
      <div
        style={{
          display: "inline-block",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Advanced Browser Frame Bar */}
        <div
          style={{
            background: "#f8fafc",
            padding: isMobile ? "6px 10px" : (isFullscreen ? "8px 15px" : "10px 20px"),
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e2e8f0",
            minWidth: "100%",
            position: "relative",
            zIndex: 1100,
            transition: "padding 0.3s ease",
            gap: isMobile ? "8px" : "0",
          }}
        >
          {/* Left Side - Functional Back/Forward Arrows */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <svg
              width={isMobile ? "14" : "16"}
              height={isMobile ? "14" : "16"}
              viewBox="0 0 24 24"
              fill="none"
              stroke={currentStep.id === 1 || showCompletion ? "#cbd5e1" : "#64748b"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                cursor: currentStep.id === 1 || showCompletion ? "not-allowed" : "pointer",
                opacity: currentStep.id === 1 || showCompletion ? 0.4 : 1,
                transition: "all 0.2s"
              }}
              onClick={() => {
                if (currentStep.id !== 1 && !showCompletion) {
                  goPrevious();
                }
              }}
              title="Previous Step (← or Backspace)"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <svg
              width={isMobile ? "14" : "16"}
              height={isMobile ? "14" : "16"}
              viewBox="0 0 24 24"
              fill="none"
              stroke={currentStepIndex === demoSteps.length - 1 || showCompletion ? "#cbd5e1" : "#64748b"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                cursor: currentStepIndex === demoSteps.length - 1 || showCompletion ? "not-allowed" : "pointer",
                opacity: currentStepIndex === demoSteps.length - 1 || showCompletion ? 0.4 : 1,
                transition: "all 0.2s"
              }}
              onClick={() => {
                if (currentStepIndex < demoSteps.length - 1 && !showCompletion) {
                  goNext();
                }
              }}
              title="Next Step (→ or Enter)"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {/* Center - URL with Globe Icon (Hidden on mobile) */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                cursor: "pointer",
              }}
              onClick={() => window.open("https://tallyconnects.com/", "_blank")}
              title="Visit TallyConnects.com"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span style={{ color: "#475569", fontSize: "14px", fontWeight: "400" }}>tallyconnects.com</span>
            </div>
          )}

          {/* Right Side - Control Buttons */}
          <div style={{ display: "flex", gap: isMobile ? "10px" : "16px", alignItems: "center" }}>
            {/* Step Counter with Progress Bar */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 10px",
              backgroundColor: "#f1f5f9",
              borderRadius: "6px",
              fontSize: isMobile ? "11px" : "12px",
              color: "#64748b",
              fontWeight: "500"
            }}>
              <span>{currentStepIndex + 1}/{demoSteps.length}</span>
              {!isMobile && (
                <>
                  <div style={{
                    width: "40px",
                    height: "4px",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "2px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${((currentStepIndex + 1) / demoSteps.length) * 100}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #7c3aed, #3b82f6)",
                      borderRadius: "2px",
                      transition: "width 0.3s ease"
                    }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                    ~{Math.ceil((demoSteps.length - currentStepIndex - 1) * 0.5)} min
                  </span>
                </>
              )}
            </div>

            {/* Divider - hide on mobile */}
            {!isMobile && <div style={{ width: "1px", height: "16px", backgroundColor: "#e2e8f0" }} />}

            {/* Audio Play/Pause */}
            <svg
              width={isMobile ? "14" : "16"}
              height={isMobile ? "14" : "16"}
              viewBox="0 0 24 24"
              fill={isAudioPlaying ? "#3b82f6" : "none"}
              stroke={isAudioPlaying ? "#3b82f6" : "#94a3b8"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ cursor: "pointer", transition: "all 0.2s", minWidth: isMobile ? "14px" : "16px" }}
              onClick={toggleAudio}
              onMouseEnter={(e) => { e.currentTarget.style.stroke = "#3b82f6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.stroke = isAudioPlaying ? "#3b82f6" : "#94a3b8"; }}
              title={isAudioPlaying ? "Pause Audio (Space)" : "Play Audio (Space)"}
            >
              {isAudioPlaying ? (
                <>
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </>
              ) : (
                <polygon points="5 3 19 12 5 21 5 3" />
              )}
            </svg>

            {/* Restart Button */}
            <svg
              width={isMobile ? "14" : "16"}
              height={isMobile ? "14" : "16"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ cursor: "pointer", transition: "stroke 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.stroke = "#64748b"}
              onMouseLeave={(e) => e.currentTarget.style.stroke = "#94a3b8"}
              onClick={restartDemo}
              title="Restart Demo (R)"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>

            {/* Fullscreen Toggle */}
            <svg
              width={isMobile ? "14" : "16"}
              height={isMobile ? "14" : "16"}
              viewBox="0 0 24 24"
              fill="none"
              stroke={isFullscreen ? "#10b981" : "#94a3b8"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ cursor: "pointer", transition: "stroke 0.2s" }}
              onMouseEnter={(e) => {
                if (!isFullscreen) e.currentTarget.style.stroke = "#64748b";
              }}
              onMouseLeave={(e) => {
                if (!isFullscreen) e.currentTarget.style.stroke = "#94a3b8";
              }}
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen (F or Esc)" : "Fullscreen (F)"}
            >
              {isFullscreen ? (
                <>
                  <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                  <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                </>
              ) : (
                <>
                  <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                  <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                </>
              )}
            </svg>

            {/* Keyboard Shortcuts Help (Hidden on mobile) */}
            {!isMobile && (
              <div style={{ position: "relative" }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={showKeyboardHints ? "#3b82f6" : "#94a3b8"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ cursor: "pointer", transition: "stroke 0.2s" }}
                  onMouseEnter={(e) => {
                    if (!showKeyboardHints) e.currentTarget.style.stroke = "#64748b";
                  }}
                  onMouseLeave={(e) => {
                    if (!showKeyboardHints) e.currentTarget.style.stroke = "#94a3b8";
                  }}
                  onClick={toggleKeyboardHints}
                  title="Keyboard Shortcuts (?)"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
            )}

            {/* Copy Link Button */}
            <svg
              width={isMobile ? "14" : "16"}
              height={isMobile ? "14" : "16"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ cursor: "pointer", transition: "stroke 0.2s" }}
              onMouseEnter={(e) => e.currentTarget.style.stroke = "#64748b"}
              onMouseLeave={(e) => e.currentTarget.style.stroke = "#94a3b8"}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setShowCopyNotification(true);
                setTimeout(() => setShowCopyNotification(false), 2000);
              }}
              title="Copy Demo Link"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </div>
        </div>

        {/* Image Container */}
        <div
          ref={setContainerRef}
          style={{
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Full Screen Image */}
          <img
            onLoad={handleImageLoad}
            src={`${currentStep.image}?v=${currentStep.id}`}
            alt="Demo Screen"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "90vw",
              maxHeight: "calc(88vh - 52px)",
              display: "block",
              backgroundColor: "#ffffff",
              filter: "none",
            }}
          />

          {/* Highlight (shifted left slightly) */}
          {showBubble && currentStep.highlightType === "border" && (
            <BorderHighlight
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              borderColor="#FFD700"
              borderWidth={3}
            />
          )}

          {/* ==================== STEP 0: AUDIO CHOICE NOTIFICATION ==================== */}
          {showBubble && currentStep.id === 0 && currentStep.showAudioNotification && currentStep.audioSrc && !step0AudioChoiceMade && (
            <AudioChoiceNotification
              audioSrc={currentStep.audioSrc}
              onPlayAudio={() => {
                setStep0AudioChoiceMade(true);
                setAllowAlertTyping(true);
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(err => {
                      console.error("Audio playback failed:", err);
                    });
                  }
                }, 100);
              }}
              onSkipAudio={() => {
                setStep0AudioChoiceMade(true);
                setAllowAlertTyping(true);
                console.log("Audio skipped by user");
              }}
            />
          )}

          {/* ==================== STEP 0: WELCOME POPUP WITH AUTO-NARRATION ==================== */}
          {showBubble && currentStep.id === 0 && (
            <div
              style={{
                opacity: allowAlertTyping ? 1 : 0,
                pointerEvents: allowAlertTyping ? "auto" : "none",
                transition: "opacity 0.3s ease",
                zIndex: 99,
              }}
            >
              <AlertPopup
                key={`alert-${currentStep.id}`}
                title={currentStep.title || "Welcome to PDF to Tally Demo"}
                message={
                  currentStep.message ||
                  "PDF to Tally is a powerful tool that converts your PDF bank statements into Tally format automatically."
                }
                buttonText={currentStep.buttonText || "Start Demo"}
                audioSrc={currentStep.audioSrc || null}
                audioRef={audioRef}
                shouldStartTyping={allowAlertTyping}
                onTypingComplete={() => setIsTypingComplete(true)}
                onNext={goNext}
                scaleX={scaleX}
                scaleY={scaleY}
              />
            </div>
          )}

          {/* Spotlight Tutorial for spotlight-enabled steps */}
          {showBubble && currentStep.spotlightTutorial && (
            <>
              <SpotlightOverlay
                x={H.x}
                y={H.y}
                width={H.width}
                height={H.height}
                scaleX={scaleX}
                scaleY={scaleY}
              />
              <InstructionCard
                title={currentStep.spotlightTutorial.title}
                description={currentStep.spotlightTutorial.description}
                onPrevious={goPrevious}
                onNext={goNext}
                currentStep={currentStepIndex + 1}
                totalSteps={demoSteps.length}
                position={currentStep.spotlightTutorial.position}
                gapOffset={
                  currentStep.id === 14
                    ? 20
                    : currentStep.id === 17
                      ? 40 // 20px base + 20px extra for step 17
                      : currentStep.id === 20
                        ? 380 // push card further right/up for step 20 top-right placement
                        : 0
                }
                x={H.x}
                y={H.y}
                width={H.width}
                height={H.height}
                scaleX={scaleX}
                scaleY={scaleY}
                containerWidth={imageWidth}
                containerHeight={imageHeight}
                isFirstStep={currentStep.id === 0}
                isLastStep={currentStepIndex === demoSteps.length - 1}
              />
            </>
          )}

          {/* Regular Highlight (bubble animation) for Steps 3+ (skip steps with spotlight/card) */}
          {showBubble &&
            currentStep.id > 2 &&
            (!currentStep.highlightType ||
              (currentStep.highlightType !== "border" &&
                currentStep.highlightType !== "none")) && (
              <HighlightBox
                x={adjHighlight.x}
                y={adjHighlight.y}
                width={adjHighlight.width}
                height={adjHighlight.height}
              />
            )}

          {/* Tooltip for Step 3 - Open PDF Converter (below position) */}
          {showBubble && currentStep.id === 3 && currentStep.highlightType !== "none" && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click Here to Open Converter"
              position="below"
              stepId={3}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 4 - Browse Button (left position) */}
          {showBubble && currentStep.id === 4 && !currentStep.spotlightTutorial && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click here to select file"
              position="left"
              stepId={4}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 5 - File Selection Border (right position, instruction style) */}
          {showBubble && currentStep.id === 5 && !currentStep.spotlightTutorial && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Select File"
              position="right"
              stepId={5}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 6 - Open Button (below position) */}
          {showBubble && currentStep.id === 6 && !currentStep.spotlightTutorial && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Open PDF"
              position="below"
              stepId={6}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 7 - Import Button (right position) */}
          {showBubble && currentStep.id === 7 && !currentStep.spotlightTutorial && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Import PDF"
              position="right"
              stepId={7}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 8 - Autodetect Tables button (below position) */}
          {showBubble && currentStep.id === 8 && !currentStep.spotlightTutorial && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Autodetect Tables"
              position="below"
              stepId={8}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 15 - Import PDF Bank data Button (top position) */}
          {showBubble && currentStep.id === 15 && !currentStep.spotlightTutorial && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to import data"
              position="top"
              stepId={15}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 16 - OK Button (left position) */}
          {showBubble && currentStep.id === 16 && !currentStep.spotlightTutorial && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click OK to continue"
              position="left"
              stepId={16}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip 1 for Step 17 - Description column (right position) */}
          {showBubble &&
            currentStep.id === 17 &&
            showTooltip1 &&
            adjHighlightLeft && (
              <Tooltip
                x={adjHighlightLeft.x}
                y={adjHighlightLeft.y}
                width={adjHighlightLeft.width}
                height={adjHighlightLeft.height}
                text="Check Description Here"
                position="right"
                stepId="17-1"
                scaleX={scaleX}
                scaleY={scaleY}
              />
            )}

          {/* Tooltip 2 for Step 17 - Ledger Name column (left position) */}
          {showBubble &&
            currentStep.id === 17 &&
            showTooltip2 &&
            adjHighlightRight && (
              <Tooltip
                x={adjHighlightRight.x}
                y={adjHighlightRight.y}
                width={adjHighlightRight.width}
                height={adjHighlightRight.height}
                text="We have Successfully extracted party names based on description"
                position="left"
                stepId="17-2"
                scaleX={scaleX}
                scaleY={scaleY}
              />
            )}

          {/* Tooltip 3 for Step 17 - Ledger Name column (left position, clickable) */}
          {showBubble &&
            currentStep.id === 17 &&
            showTooltip3 &&
            adjHighlightRight && (
              <Tooltip
                x={adjHighlightRight.x}
                y={adjHighlightRight.y}
                width={adjHighlightRight.width}
                height={adjHighlightRight.height}
                text="Click here to Verify and Continue"
                position="left"
                stepId="17-3"
                scaleX={scaleX}
                scaleY={scaleY}
                onNext={goNext}
              />
            )}

          {/* Tooltip for Step 18 - Create Receipt /Payment Vouchers Button (left position with right arrow) */}
          {showBubble && currentStep.id === 18 && !currentStep.spotlightTutorial && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to create voucher"
              position="left"
              stepId={18}
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 23 - Bank Statement Selection (top position, instruction style) */}
          {showBubble && currentStep.id === 23 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Select this Option"
              position="top"
              stepId="23-1"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 24 - Open Button (below position, instruction style) */}
          {showBubble && currentStep.id === 24 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click on Open"
              position="below"
              stepId="24-1"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 25 - Yes Button (below position, instruction style) */}
          {showBubble && currentStep.id === 25 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to continue"
              position="below"
              stepId="25-1"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Tooltip for Step 27 - Tally Prime Total Box (right position, instruction style) */}
          {showBubble && currentStep.id === 27 && (
            <Tooltip
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text="Click to Continue"
              position="right"
              stepId="27-1"
              scaleX={scaleX}
              scaleY={scaleY}
              onNext={goNext}
            />
          )}

          {/* Comment box at bottom-center */}
          {/* {showBubble && (
            <CommentBox
              x={adjHighlight.x}
              y={adjHighlight.y}
              width={adjHighlight.width}
              height={adjHighlight.height}
              text={currentStep.text}
            />
          )} */}

          {/* Clickable overlay on highlighted area (replaces Next button). */}
          {showBubble && adjHighlight && (
            <div
              onClick={goNext}
              style={{
                position: "absolute",
                top: adjHighlight.y,
                left: adjHighlight.x,
                width: adjHighlight.width,
                height: adjHighlight.height,
                cursor: "pointer",
                background: "transparent",
                borderRadius: "8px",
                zIndex: 40,
              }}
            />
          )}
        </div>
      </div>

      {/* Navigation Bar - Positioned at bottom with spread buttons */}
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0",
          right: "0",
          width: "100%",
          zIndex: 100,
        }}
      >
        <NavigationBar
          currentStep={currentStepIndex}
          totalSteps={demoSteps.length}
          onNext={goNext}
          onPrevious={goPrevious}
          isFullscreen={isFullscreen}
          disableNext={(currentStep.id === 0 && (!isTypingComplete || !step0AudioChoiceMade)) || currentStepIndex === demoSteps.length - 1 || showCompletion}
        />
      </div>

      {/* Keyboard Hints Popup */}
      {showKeyboardHints && !isMobile && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: "20px",
            backgroundColor: "#1e293b",
            color: "#e2e8f0",
            padding: "16px 20px",
            borderRadius: "8px",
            fontSize: "13px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            zIndex: 2000,
            minWidth: "240px",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <div style={{ fontWeight: "600", marginBottom: "12px", color: "#f1f5f9" }}>
            Keyboard Shortcuts
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Navigate:</span>
              <div style={{ display: "flex", gap: "6px" }}>
                <kbd style={{
                  padding: "2px 8px",
                  backgroundColor: "#334155",
                  borderRadius: "4px",
                  fontSize: "11px",
                  border: "1px solid #475569"
                }}>←</kbd>
                <kbd style={{
                  padding: "2px 8px",
                  backgroundColor: "#334155",
                  borderRadius: "4px",
                  fontSize: "11px",
                  border: "1px solid #475569"
                }}>→</kbd>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Next Step:</span>
              <kbd style={{
                padding: "2px 8px",
                backgroundColor: "#334155",
                borderRadius: "4px",
                fontSize: "11px",
                border: "1px solid #475569"
              }}>Enter</kbd>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Previous Step:</span>
              <kbd style={{
                padding: "2px 8px",
                backgroundColor: "#334155",
                borderRadius: "4px",
                fontSize: "11px",
                border: "1px solid #475569"
              }}>Backspace</kbd>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Fullscreen:</span>
              <kbd style={{
                padding: "2px 8px",
                backgroundColor: "#334155",
                borderRadius: "4px",
                fontSize: "11px",
                border: "1px solid #475569"
              }}>F</kbd>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Exit Fullscreen:</span>
              <kbd style={{
                padding: "2px 8px",
                backgroundColor: "#334155",
                borderRadius: "4px",
                fontSize: "11px",
                border: "1px solid #475569"
              }}>Esc</kbd>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Restart:</span>
              <kbd style={{
                padding: "2px 8px",
                backgroundColor: "#334155",
                borderRadius: "4px",
                fontSize: "11px",
                border: "1px solid #475569"
              }}>R</kbd>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Audio:</span>
              <kbd style={{
                padding: "2px 8px",
                backgroundColor: "#334155",
                borderRadius: "4px",
                fontSize: "11px",
                border: "1px solid #475569"
              }}>Space</kbd>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#94a3b8" }}>Toggle Help:</span>
              <kbd style={{
                padding: "2px 8px",
                backgroundColor: "#334155",
                borderRadius: "4px",
                fontSize: "11px",
                border: "1px solid #475569"
              }}>?</kbd>
            </div>
          </div>
          <div style={{
            marginTop: "12px",
            paddingTop: "12px",
            borderTop: "1px solid #334155",
            fontSize: "11px",
            color: "#64748b",
            textAlign: "center"
          }}>
            Click ? again to close
          </div>
        </div>
      )}

      {/* Copy Link Notification Toast */}
      {showCopyNotification && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            right: isMobile ? "50%" : "20px",
            transform: isMobile ? "translateX(50%)" : "none",
            backgroundColor: "#1e293b",
            color: "#e2e8f0",
            padding: "8px 16px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Link Copied to Clipboard
        </div>
      )}

      {/* Completion Banner - shown when demo is finished */}
      {showCompletion && <CompletionBanner scaleX={scaleX} scaleY={scaleY} />}
    </div>
  );
};

export default DemoEngine;
