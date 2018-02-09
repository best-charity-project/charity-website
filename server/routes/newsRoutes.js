const express = require('express');
const router = express.Router();
const DB = require('../database/database');

router.route('/news')

	// get all news
	.get((req, res) => {
		const database = new DB();
		database.connect(database.URI)
			.then(() => {
				return database.getAllNews();
			})
			.then((result) => {
				res.json(result);
				database.close();
			})
			.catch((err) => { throw err });
	});

module.exports = router;