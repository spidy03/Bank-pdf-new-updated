/**
 * Auto-reload service for development
 * DISABLED - Only HMR (Hot Module Replacement) is used now
 */

export const startAutoReload = () => {
  // Auto-reload disabled - only manual refresh or HMR will reload
  if (process.env.NODE_ENV === "development") {
    console.log("ℹ️ Auto-reload disabled. Use Ctrl+R to refresh manually, or changes will be applied via HMR.");
  }
};

export default startAutoReload;
