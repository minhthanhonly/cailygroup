const express = require('express');
const router = express.Router();
const {Groups} = require("../models")

router.get("/", async (req, res) => {
    const listOfGoups = await Groups.findAll();
    res.json(listOfGoups);
});

router.post("/", async (req, res) => {
    const group = req.body;
    await Groups.create(group);
    res.json(group)
});

// router.post();

module.exports = router