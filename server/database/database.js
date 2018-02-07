const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const { user, password, port, dbName } = require('../configs/config.json');

class DB {
	constructor() {
		this.URI = `mongodb://${user}:${password}@ds119258.mlab.com:${port}/${dbName}`;
		this.db = null;
		this.dbClient = null;
	}
	connect() {
		if (this.db) {
			return Promise.resolve(this.db);
		}
		return new Promise((resolve, reject) => {
			MongoClient.connect(this.URI)
				.then((database) => {
					this.db = database.db(dbName);
					this.dbClient = database;
					console.log('Connected to database!');
					resolve(database);
				})
				.catch(err => reject(err.message));
		});
	}

	close() {
		if (this.db) {
			this.dbClient.close()
				.then(() => console.log('Connection closed'))
				.catch(err => {throw err});
		}
	}
}

module.exports = DB;