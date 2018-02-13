const { MongoClient } = require('mongodb').MongoClient; // eslint-disable-line import/no-unresolved
const {
  user, password, port, dbName, host,
} = require('../configs/config.json');

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
      })
      .catch((err) => {
        throw err;
      });
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
    return this.db
      .collection('news')
      .find()
      .toArray()
      .then(result => result)
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = DB;
