import express from "express";
import fetch from "node-fetch";
const router = express.Router();

router.get("/google", (req, res) => {
    const redirectUri = "https://accounts.google.com/o/oauth2/v2/auth?" +
        new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            response_type: "code",
            scope: "https://www.googleapis.com/auth/calendar",
            access_type: "offline",
            prompt: "consent"
        });
    res.redirect(redirectUri);
});

router.get("/google/callback", async (req, res) => {
    const code = req.query.code;
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code"
        })
    });
    const tokens = await tokenResponse.json();

    // Save tokens in DB
    console.log(tokens);

    // Redirect back to frontend
    res.redirect("http://localhost:3000/success");
});

export default router;
