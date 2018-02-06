const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const config = require('../configs/config');
const URI = `mongodb://${config.user}:${config.password}@ds119258.mlab.com:${config.port}/${config.dbName}`;

// The MongoDB database connection
function DB() {
    this.URI = URI;
    this.db = null;
    this.dbClient = null;
}

DB.prototype.connect = function(uri) {
    return new Promise((resolve, reject) => {
		if (this.db) {
			resolve();
		} else {
			MongoClient.connect(uri)
			.then(
				(database) => {
                    this.db = database.db('charity_project');
                    this.dbClient = database;
                    console.log('Connected to database!');
					resolve();
				},
				(err) => {
					console.log("Error connecting: " + err.message);
					reject(err.message);
				}
			)
		}
	});
}

DB.prototype.close = function() {
	if (this.db) {
		this.dbClient.close()
		.then(
			function() {
                console.log('Connection closed');
            },
			function(error) {
				console.log("Failed to close the database: " + error.message)
			}
		);
	}
}

module.exports = DB;