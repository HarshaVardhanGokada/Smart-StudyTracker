const express = require("express");
const passport = require("passport");

const router = express.Router();

// Google login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173",
  })
);

// User info
router.get("/user", (req, res) => {
  if (req.user) return res.json(req.user);
  res.status(401).json({ message: "Not logged in" });
});

// Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("http://localhost:5173");
  });
});

module.exports = router;
