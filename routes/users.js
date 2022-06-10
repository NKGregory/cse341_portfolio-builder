const routes = require('express').Router();
const { response } = require('express');
const { requiresAuth } = require('express-openid-connect');
const res = require('express/lib/response');
const connectUser = require('../db/connectUser');
const OjectId = require('mongodb').ObjectId;
const validation = require('../middleware/validate');


//Get all Users
routes.get('/', requiresAuth(), (_req, res) => {
  const results = connectUser.getUserCollection().find();

  results.toArray((err, lists) => {
    if(err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
});

//Get One User
routes.get('/:id', requiresAuth(), (req, res) => {
  if (!OjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a User.');
  }
  const userId = new OjectId(req.params.id);
  const results = connectUser.getUserCollection().find({ _id: userId });

  results.toArray((err, result) => {
    if(err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  });
});

//Post to Users
routes.post('/', requiresAuth(), validation.saveUser, (_req, _res) => {
    const user = {
        username: _req.body.username,
        password: _req.body.password
    };
    const results = connectUser.getUserCollection().insertOne(user);
    console.log(results);
    if(results.acknowledged) {
      res.status(201).json(results);
    } else {
      res.status(500).json(results.error || 'Some error occurred while creating the User.');
    }
});

//Replace User by ID
routes.put('/:id', requiresAuth(), validation.saveUser, (_req, _res) => {
  if (!OjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to update a User.');
  }
    const putId = new OjectId(_req.params.id);
    const user = {
      username: _req.body.username,
      password: _req.body.password
  };
    const results = connectUser.getUserCollection().replaceOne({ _id: putId }, user);
    console.log(results);
    if(results.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(results.error || 'Some error occurred while updating a User.');
    }
});

//Delete User by ID
routes.delete('/:id', requiresAuth(), (_req, _res) => {
  if (!OjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete a User.');
  }
    const deleteId = new OjectId(_req.params.id);
    const results = connectUser.getUserCollection().deleteOne({ _id: deleteId },true);
    console.log(results);
    if(results.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(results.error || 'Some error occurred while deleting a User.');
    }
});

module.exports = routes;