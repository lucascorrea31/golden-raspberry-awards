const db = require("../database");

const Movie = {
	getWinningMovies: (callback) => {
		db.all(`SELECT * FROM movies WHERE winner = 1`, [], callback);
	},
};

module.exports = Movie;
