const express = require("express");
const cors = require("cors");

const NetflixAccountChecker = require("./main");

const app = express();
const checker = new NetflixAccountChecker();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Netflix Checker Backend Running");
});

app.post("/check", async (req, res) => {
  try {
    const { cookies } = req.body;

    if (!cookies || !Array.isArray(cookies)) {
      return res.status(400).json({
        success: false,
        error: "cookies must be an array"
      });
    }

    const results = [];

    for (const cookie of cookies) {
      const result = await checker.checkCookie(cookie);
      results.push(result);
    }

    res.json({
      success: true,
      results
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
