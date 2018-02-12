const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const {
  user, password, port, dbName, host,
} = require('../configs/config.json');

class DB {
<<<<<<< HEAD
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
        return db;
      })
      .catch((err) => {
        throw err;
      });
  }

  close() {
    if (this.db) {
      this.dbClient
        .close()
        .then(() => console.log('Connection closed'))
        .catch((err) => {
          throw err;
        });
    }
  }
=======
	constructor() {
		this.URI = `mongodb://${user}:${password}@${host}:${port}/${dbName}`;
		this.db = null;
		this.dbClient = null;
	}

	connect() {
		return MongoClient.connect(this.URI)
			.then(client => {
				this.db = client.db(dbName);
				this.dbClient = client;
			})
			.catch(err => { throw err });
	}

	close() {
		if (this.db) {
			this.dbClient.close();
		}
	}

	addOneNews(news) {
		return this.db.collection('news').insertOne(news);
	}

	getAllNews() {
		return this.db.collection('news').find().toArray()
			.then(result => {
				return result;
			})
			.catch(err => { throw err });
	}
>>>>>>> 998b2f718c3844e844022cc8247c5e3c0ead6b21
}

module.exports = DB;
