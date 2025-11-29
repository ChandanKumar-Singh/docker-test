module.exports = {
    apps: [
      {
        name: "app",
        script: "./index.js",   // CHANGE if your entry file is index.js or app.js
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: "300M"
      }
    ]
  };
  