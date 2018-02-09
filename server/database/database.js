const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const { user, password, port, dbName, host } = require('../configs/config.json');

class DB {
	constructor() {
		this.URI = `mongodb://${user}:${password}@${host}:${port}/${dbName}`;
		this.db = null;
		this.dbClient = null;
	}

	connect() {
		return MongoClient.connect(this.URI)
			.then((client) => {
				this.db = client.db(dbName);
				this.dbClient = client;
				console.log('Connected to database');
			})
			.catch(err => { throw err });
	}

	close() {
		if (this.db) {
			this.dbClient.close()
				.then(() => console.log('Connection closed'))
				.catch(err => { throw err });
		}
	}

	addOneNews(news) {
		return this.db.collection('news').insertOne(news)
			.then(() => {
				console.log('News successfully inserted');
			})
			.catch(err => { throw err });
	}

	getAllNews() {
		return this.db.collection('news').find().toArray()
			.then((result) => {
				console.log('News were received successfully');
				return result;
			})
			.catch(err => { throw err });
	}
}

module.exports = DB;