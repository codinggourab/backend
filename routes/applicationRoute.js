import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

// Apply to event
router.post("/", async (req, res) => {
  const app = new Application(req.body);
  await app.save();
  res.json(app);
});

// Get all applications
router.get("/", async (req, res) => {
  const apps = await Application.find();
  res.json(apps);
});

export default router;