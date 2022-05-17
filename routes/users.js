const routes = require('express').Router();
const connect = require('../db/connect');
const OjectId = require('mongodb').ObjectId;


//Get all Users
routes.get('/', (_req, res) => {
  const results = connect.getCollection().find();

  results.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('Returned All Users');
  });
});

//Get One User
routes.get('/:id', (req, res) => {
  const userId = new OjectId(req.params.id);
  const results = connect.getCollection().find({ _id: userId });

  results.toArray().then((documents) => {
    res.status(200).json(documents[0]);
    console.log(`Returned Contact ${req.params.id}`);
  });
});

//Post to Users
routes.post('/', (_req, _res) => {
    const user = {
        username: _req.body.username,
        password: _req.body.password
    };
    const results = connect.getCollection().insertOne(user);
    results.then((documents) => {
        _res.status(201).json(documents);
    })
});

//Replace User by ID
routes.put('/:id', (_req, _res) => {
    const putId = new OjectId(_req.params.id);
    const user = {
      username: _req.body.username,
      password: _req.body.password
  };
    const results = connect.getCollection().replaceOne({ _id: putId }, user);
    results.then((documents) => {
        _res.status(202).json(documents);
    });
});

//Delete User by ID
routes.delete('/:id', (_req, _res) => {
    const deleteId = new OjectId(_req.params.id);
    const results = connect.getCollection().deleteOne({ _id: deleteId },true);
    results.then((documents) => {
        _res.status(203).json(documents);
        console.log(`Deleted User Id: ${deleteId}`);
    });
});

module.exports = routes;