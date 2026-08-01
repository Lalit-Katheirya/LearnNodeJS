import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/admin-dashboard", (req, res) => {
    res.render("adminDashboard");
});

router.get("/user-dashboard", (req, res) => {
    res.render("userDashboard");
});

router.get("/logout", (req, res) => {
    // If you have session or token cleanup, do it here.
    res.redirect('/login');
});

router.get("/dashboard", (req, res) => {
    res.render("userDashboard");
});

export default router;