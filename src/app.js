const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const db = require("./database");
const awardsRoute = require("./routes/awards");

const app = express();
const PORT = process.env.PORT || 3000;

function loadCSV() {
	fs.createReadStream("./data/movielist.csv")
		.pipe(csv({ separator: ";" }))
		.on("data", (row) => {
			const { year, title, studios, producers, winner } = row;
			const isWinner = winner && winner.toLowerCase() === "yes" ? 1 : 0;
			db.run(
				`INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)`,
				[year, title, studios, producers, isWinner]
			);
		})
		.on("end", () => {
			console.log("CSV file is successfully processed");
		});
}

// Routes
app.use("/awards", awardsRoute);

loadCSV();

if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
}

module.exports = app;
