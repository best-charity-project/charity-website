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
	})
	// add one news
	.post((req, res) => {
		const database = new DB();
		database.connect(database.URI)
			.then(() => {
				const news = req.body;
				return database.addOneNews(news);
			})
			.then(() => {
				res.json({ message: 'News was created successfully!' });
				database.close();
			})
			.catch((err) => { throw err });
	});

module.exports = router;