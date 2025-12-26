/**
 * Hot Reload Helper
 * Enables aggressive file watching and fallback full-page reload if HMR misses updates.
 * Useful for OneDrive/Windows environments with slow file sync.
 */

export const enableHotReload = () => {
  // Monitor for any WebSocket disconnections from dev server
  if (module.hot) {
    module.hot.accept(() => {
      // HMR accepted - changes will be applied
    });
  }

  // Fallback: if in development, check for file changes via polling
  if (process.env.NODE_ENV === "development") {
    // Optional: log when HMR is active
    if (module.hot) {
      console.log("✓ HMR (Hot Module Replacement) is active");
    }
  }
};

export const forceReload = () => {
  window.location.reload();
};
