const Movie = require("../models/movie");

function calculateIntervals(producers) {
	const intervals = [];

	producers.forEach((producer) => {
		const wins = producer.wins;
		for (let i = 1; i < wins.length; i++) {
			intervals.push({
				producer: producer.name,
				interval: wins[i] - wins[i - 1],
				previousWin: wins[i - 1],
				followingWin: wins[i],
			});
		}
	});

	return intervals;
}

function findMinMaxIntervals(callback) {
	Movie.getWinningMovies((err, movies) => {
		if (err) return callback(err);

		const producers = {};

		movies.forEach((movie) => {
			const producerNames = movie.producers.split(",").map((p) => p.trim());
			producerNames.forEach((name) => {
				if (!producers[name]) producers[name] = { name, wins: [] };
				producers[name].wins.push(parseInt(movie.year, 10));
			});
		});

		Object.values(producers).forEach((producer) =>
			producer.wins.sort((a, b) => a - b)
		);

		const intervals = calculateIntervals(Object.values(producers));

		if (intervals.length === 0) {
			return callback(null, { min: [], max: [] });
		}

		const maxInterval = Math.max(...intervals.map((i) => i.interval));
		const minInterval = Math.min(...intervals.map((i) => i.interval));

		const maxIntervals = intervals.filter(
			(interval) => interval.interval === maxInterval
		);
		const minIntervals = intervals.filter(
			(interval) => interval.interval === minInterval
		);

		callback(null, { min: minIntervals, max: maxIntervals });
	});
}

module.exports = { findMinMaxIntervals };
