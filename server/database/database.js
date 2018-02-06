const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const { user, password, port, dbName } = require('../configs/config');
const URI = `mongodb://${user}:${password}@ds119258.mlab.com:${port}/${dbName}`;

// The MongoDB database connection
function DB() {
	this.URI = URI;
	this.db = null;
	this.dbClient = null;
}

DB.prototype.connect = function(uri) {
	if (this.db) {
		return Promise.resolve(this.db);
	}
	return new Promise((resolve, reject) => {
		MongoClient.connect(uri)
			.then((database) => {
				this.db = database.db(dbName);
				this.dbClient = database;
				console.log('Connected to database!');
				resolve(database);
			})
			.catch(err => {
				console.error("Error connecting: " + err.message);
				reject(err.message);
			});
	});
}

DB.prototype.close = function() {
	if (this.db) {
		this.dbClient.close()
			.then(() => console.log('Connection closed'))
			.catch(err => console.error("Failed to close the database: " + err.message)
		);
	}
}

const db = new DB();
db.connect(db.URI);

module.exports = DB;