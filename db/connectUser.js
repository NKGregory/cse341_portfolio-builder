// .env variables MONGODB_URI
const dotenv = require('dotenv');
dotenv.config();

//database
const MongoClient = require('mongodb').MongoClient;

let _client;
let _collection;

const initDatatbaseUser = () => {
  MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if (err) throw err;
    _client = client;
    _collection = _client.db('portfolio-builder').collection('users');
    console.log('DB Users Connected Successfully');
  });
};

const getUserCollection = () => {
  return _collection;
};

module.exports = { initDatatbaseUser, getUserCollection };