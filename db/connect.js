// .env variables MONGODB_URI
const dotenv = require('dotenv');
dotenv.config();

//database
const MongoClient = require('mongodb').MongoClient;

let _client;
let _collection;

const initDatatbase = () => {
  MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if (err) throw err;
    _client = client;
    _collection = _client.db('portfolio-builder').collection('recipes');
    console.log('DB Recipes Connected Successfully');
  });
};

const getCollection = () => {
  return _collection;
};

module.exports = { initDatatbase, getCollection };