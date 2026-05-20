import express from "express";
import pool from "../db.js";
const router = express.Router();

const CAPACITY = 20; // backpack holds 20 kg

// build the full snapshot the front-end draws from
function buildState(req, allItems) {
    const bag = req.session.bag ?? [];

    // walk the bag (in add order) to get the items, used weight and value
    let usedWeight = 0;
    let value = 0;
    const bagItems = [];
    for (const id of bag) {
        const item = allItems.find(it => it.id === id);
        if (item) {
            bagItems.push(item);
            usedWeight += item.weight;
            value += item.value;
        }
    }

    const remaining = CAPACITY - usedWeight;

    // items NOT in the bag -> the left panel; flag whether each one still fits
    const items = [];
    for (const it of allItems) {
        if (!bag.includes(it.id)) {
            it.fits = it.weight <= remaining;
            items.push(it);
        }
    }

    return {
        capacity: CAPACITY,
        remaining,
        value,
        bagItems,
        items,
        maxValue: req.session.maxValue ?? 0,
    };
}

// GET /api/state -> current snapshot
router.get("/state", async (req, res) => {
    const [allItems] = await pool.query("select * from items order by id");
    res.json(buildState(req, allItems));
});

// POST /api/bag/:id -> add an item to the bag (only if it fits)
router.post("/bag/:id", async (req, res) => {
    const id = Number(req.params.id);
    const [allItems] = await pool.query("select * from items order by id");

    if (!req.session.bag) req.session.bag = [];

    const item = allItems.find(it => it.id === id);
    const state = buildState(req, allItems); // to read current remaining

    // add only if it exists, is not already in the bag, and fits
    if (item && !req.session.bag.includes(id) && item.weight <= state.remaining) {
        req.session.bag.push(id);

        // update "max value so far" if this beats the record (req i)
        const newState = buildState(req, allItems);
        if (newState.value > (req.session.maxValue ?? 0)) {
            req.session.maxValue = newState.value;
            req.session.maxBag = [...req.session.bag];
        }
    }

    res.json(buildState(req, allItems));
});

// DELETE /api/bag/:id -> remove one item from the bag (req h)
router.delete("/bag/:id", async (req, res) => {
    const id = Number(req.params.id);
    req.session.bag = (req.session.bag ?? []).filter(x => x !== id);

    const [allItems] = await pool.query("select * from items order by id");
    res.json(buildState(req, allItems));
});

// DELETE /api/bag -> reset: empty the bag (req g). Max value stays.
router.delete("/bag", async (req, res) => {
    req.session.bag = [];

    const [allItems] = await pool.query("select * from items order by id");
    res.json(buildState(req, allItems));
});

// GET /api/max -> web service: items that produced the max value (req j)
// 1 second delay so the spinner is visible.
router.get("/max", (req, res) => {
    setTimeout(async () => {
        const maxBag = req.session.maxBag ?? [];
        const [allItems] = await pool.query("select * from items order by id");

        const items = [];
        for (const id of maxBag) {
            const item = allItems.find(it => it.id === id);
            if (item) items.push(item);
        }
        res.json(items);
    }, 1000);
});

export default router;
