module.exports = {
  apps: [
    {
      name: "JCWD-VL02-02", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 3022,
      },
      time: true,
    },
  ],
};
