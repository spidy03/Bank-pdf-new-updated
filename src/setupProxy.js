module.exports = function setupProxy(app) {
  // Add a simple build timestamp endpoint for auto-reload
  app.get("/api/build-time", (req, res) => {
    res.json({ buildTime: Date.now() });
  });
};
