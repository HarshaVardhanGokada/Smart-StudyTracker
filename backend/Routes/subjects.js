const express = require("express");
const Subject = require("../models/Subject");

const router = express.Router();

// Get all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch {
    res.status(500).json({ error: "Unable to fetch subjects" });
  }
});

// Create subject
router.post("/", async (req, res) => {
  try {
    const subject = new Subject({ name: req.body.name, topics: [] });
    await subject.save();
    res.json(subject);
  } catch {
    res.status(500).json({ error: "Unable to create subject" });
  }
});

// Delete subject
router.delete("/:id", async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ message: "Subject deleted" });
  } catch {
    res.status(500).json({ error: "Unable to delete subject" });
  }
});

// Add topic
router.post("/:id/topics", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    subject.topics.push({ name: req.body.name, done: false });
    await subject.save();
    res.json(subject);
  } catch {
    res.status(500).json({ error: "Unable to add topic" });
  }
});

// Delete topic
router.delete("/:id/topics/:topicId", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    subject.topics = subject.topics.filter((t) => t._id.toString() !== req.params.topicId);
    await subject.save();
    res.json(subject);
  } catch {
    res.status(500).json({ error: "Unable to delete topic" });
  }
});

// ✅ Update topic status (checkbox tick)
router.put("/:id/topics/:topicId", async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    const topic = subject.topics.id(req.params.topicId);
    topic.done = req.body.done;
    await subject.save();
    res.json(subject);
  } catch {
    res.status(500).json({ error: "Unable to update topic status" });
  }
});

module.exports = router;
