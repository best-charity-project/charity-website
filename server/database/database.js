const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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
}

module.exports = DB;
