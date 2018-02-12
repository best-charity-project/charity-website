const express = require('express');
const router = express.Router();
const DB = require('../database/database');
const database = new DB();

router.route('/news')
	.get((req, res) => {
		database.connect(database.URI)
			.then(() => {
				return database.getAllNews();
			})
			.then(result => {
				res.json(result);
				database.close();
			})
			.catch(err => { throw err });
	})
	.post((req, res) => {
		database.connect(database.URI)
			.then(() => {
				const news = req.body;
				return database.addOneNews(news);
			})
			.then(() => {
				res.json({ message: 'News was created successfully!' });
				database.close();
			})
			.catch(err => { throw err });
	});

module.exports = router;