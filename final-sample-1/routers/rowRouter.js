import express from "express";
import pool from "../db.js";
const router = express.Router();


router.get("/rows", async (req, res) => {
    try {
        const [rows] = await pool.query("select * from projects");
        res.json(rows);
    } catch {
        console.log("rows error");
        res.status(500).json([]);
    }
});

router.get("/tags/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const [tags] = await pool.query(
            "select * from tags where team = ?",
            [id]
        );
        res.json(tags);
    } catch {
        console.log(`tags ${id} error`);
        res.status(500).json([]);
    }
});

// search list lives in the session
router.get("/search", (req, res) => {
    res.json(req.session.searchTags ?? []);
});

// Q2a/Q2b) add a tag (search box or tag click)
router.post("/search", (req, res) => {
    const tag = (req.body.tag ?? "").trim();
    if (!req.session.searchTags) req.session.searchTags = [];
    if (tag && !req.session.searchTags.includes(tag)) {
        req.session.searchTags.push(tag);
    }
    res.json(req.session.searchTags);
});

// Q2d) remove a tag
router.delete("/search/:tag", (req, res) => {
    req.session.searchTags = (req.session.searchTags ?? [])
        .filter(t => t !== req.params.tag);
    res.json(req.session.searchTags);
});

// Q3b) toggle like without ajax: flip likeit then reload the page
router.get("/like/:team", async (req, res) => {
    await pool.query(
        "update projects set likeit = 1 - likeit where team = ?",
        [req.params.team]
    );
    res.redirect("/");
});

// Q3a) toggle like with ajax: wait 1s, flip likeit, return new state
router.post("/like/:team", (req, res) => {
    const team = req.params.team;

    // sleep(1) -> do the work after a 1 second delay
    setTimeout(async () => {
        try {
            await pool.query(
                "update projects set likeit = 1 - likeit where team = ?",
                [team]
            );
            const [rows] = await pool.query(
                "select * from projects where team = ?",
                [team]
            );
            res.json({ team: Number(team), likeit: rows[0].likeit });
        } catch {
            console.log(`like ${team} error`);
            res.status(500).json({ error: "like failed" });
        }
    }, 1000);
});

export default router;
