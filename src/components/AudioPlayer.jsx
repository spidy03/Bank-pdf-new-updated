import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = React.forwardRef(
  (
    {
      src,
      autoPlay = false,
      title = "Narration",
      onPlayStart,
      onLoadedMetadata,
      showMinimalUI = false,
    },
    ref
  ) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Use forwarded ref or internal ref
    React.useImperativeHandle(ref, () => audioRef.current);

    // Handle metadata loaded (duration)
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
        setIsLoading(false);
        if (onLoadedMetadata) {
          onLoadedMetadata();
        }
      }
    };

    // Update current time
    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    // Handle play/pause
    const togglePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
          if (onPlayStart) {
            onPlayStart();
          }
        }
      }
    };

    // Handle progress bar change
    const handleProgressChange = (e) => {
      const newTime = parseFloat(e.target.value);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    };

    // Format time (MM:SS)
    const formatTime = (time) => {
      if (isNaN(time)) return "0:00";
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // Auto play if specified
    useEffect(() => {
      if (autoPlay && audioRef.current && !isLoading) {
        audioRef.current.play();
        setIsPlaying(true);
        if (onPlayStart) {
          onPlayStart();
        }
      }
    }, [autoPlay, isLoading, onPlayStart]);

    // Track audio play/pause state from the audio element itself
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }, []);

    // Handle audio end
    const handleAudioEnd = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    // Minimal UI mode - only progress bar
    if (showMinimalUI) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 0",
            width: "100%",
          }}
        >
          <audio
            ref={audioRef}
            src={src}
            preload="metadata"
            crossOrigin="anonymous"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleAudioEnd}
          />

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            disabled={isLoading}
            style={{
              flex: 1,
              height: "4px",
              borderRadius: "2px",
              background: "rgba(59, 130, 246, 0.15)",
              outline: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />

          <style>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 10px;
            height: 10px;
            borderRadius: 50%;
            background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
          }

          input[type="range"]::-moz-range-thumb {
            width: 10px;
            height: 10px;
            borderRadius: 50%;
            background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
          }
        `}</style>
        </div>
      );
    }

    // Full UI mode (original)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 20px",
          background:
            "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)",
          borderRadius: "12px",
          border: "1px solid rgba(102, 126, 234, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <audio
          ref={audioRef}
          src={src}
          preload="metadata"
          crossOrigin="anonymous"
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnd}
        />

        {/* Speaker Icon */}
        <div
          style={{
            fontSize: "20px",
            animation: isPlaying ? "pulse 1.5s ease-in-out infinite" : "none",
          }}
        >
          🔊
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#ffffff",
            fontSize: "18px",
            cursor: isLoading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            opacity: isLoading ? 0.6 : 1,
            boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 16px rgba(102, 126, 234, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
          }}
        >
          {isLoading ? "⏳" : isPlaying ? "⏸" : "▶"}
        </button>

        {/* Time Display */}
        <div
          style={{
            fontSize: "12px",
            color: "#667eea",
            fontWeight: "600",
            minWidth: "40px",
            textAlign: "center",
          }}
        >
          {formatTime(currentTime)}
        </div>

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          disabled={isLoading}
          style={{
            flex: 1,
            height: "4px",
            borderRadius: "2px",
            background: "rgba(102, 126, 234, 0.2)",
            outline: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            WebkitAppearance: "none",
            appearance: "none",
          }}
        />

        {/* Total Duration */}
        <div
          style={{
            fontSize: "12px",
            color: "#667eea",
            fontWeight: "600",
            minWidth: "40px",
            textAlign: "center",
          }}
        >
          {formatTime(duration)}
        </div>

        {/* Narration Label */}
        <div
          style={{
            fontSize: "12px",
            color: "#6b7280",
            fontWeight: "500",
            paddingLeft: "8px",
            borderLeft: "1px solid rgba(102, 126, 234, 0.2)",
            minWidth: "80px",
          }}
        >
          {title}
        </div>

        <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          borderRadius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          borderRadius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
        }
      `}</style>
      </div>
    );
  }
);

AudioPlayer.displayName = "AudioPlayer";
export default AudioPlayer;
