// const express = require("express");

// const app = express();
// const PORT = 8000;

// app.get("/", (req, res) => {
//   res.send("Hello World without db");
// });

// app.get("/about", (req, res) => {
//   res.send("About route 🎉 ");
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db"); // your DB connection function

const app = express();
const PORT = process.env.PORT || 8000;

// keep your original routes exactly as-is
app.get("/", (req, res) => {
  res.send("Hello World db logic");
});

app.get("/about", (req, res) => {
  res.send("About route 🎉 ");
});

// Try to connect to DB (but do NOT block starting the server).
// This ensures your "/" and "/about" routes respond even if DB is down.
connectDB()
  .then(() => {
    console.log("✅ connectDB: database connection established.");
  })
  .catch((err) => {
    console.warn(
      "⚠️ connectDB: failed to connect to database. Continuing without DB. Error:",
      err && err.message ? err.message : err
    );
    // Note: we intentionally do NOT exit process so routes stay available.
  });

// Start the server immediately so routes are always available.
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
