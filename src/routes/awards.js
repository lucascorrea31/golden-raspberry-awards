const express = require("express");
const { findMinMaxIntervals } = require("../services/awardsService");

const router = express.Router();

router.get("/producers/intervals", (req, res) => {
	findMinMaxIntervals((err, result) => {
		if (err) {
			res.status(500).json({ error: "An error occurred" });
		} else {
			res.json(result);
		}
	});
});

module.exports = router;
