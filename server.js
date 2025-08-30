const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/", (_req, res) => res.status(200).send("Bybit relay OK"));

app.get("/v5/position/closed-pnl", async (req, res) => {
  try {
    const qs = req.originalUrl.split("?")[1] || "";
    const url = "https://api.bybit.com/v5/position/closed-pnl" + (qs ? "?" + qs : "");
    const r = await fetch(url, { headers: { "User-Agent": "GScripts-Bybit-Relay" } });
    const text = await r.text();
    res
      .status(r.status)
      .set("Access-Control-Allow-Origin", "*")
      .set("Content-Type", r.headers.get("content-type") || "application/json")
      .send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Relay running on :" + PORT));
