const routes = require('express').Router();
const { response } = require('express');
const { requiresAuth } = require('express-openid-connect');
const res = require('express/lib/response');
const connect = require('../db/connect');
const OjectId = require('mongodb').ObjectId;
const validation = require('../middleware/validate');


//Get all Recipes
routes.get('/', requiresAuth(), (_req, res) => {
  const results = connect.getCollection().find();

  results.toArray((err, lists) => {
    if(err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
    res.status(401);
  });
});

//Get One Recipe
routes.get('/:id', requiresAuth(), (req, res) => {
  if (!OjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to find a Recipe.');
  }
  const recipeId = new OjectId(req.params.id);
  const results = connect.getCollection().find({ _id: recipeId });

  results.toArray((err, result) => {
    if(err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
    res.status(401);
  });
});

//Post to Recipes
routes.post('/', requiresAuth(), validation.saveRecipe, (_req, _res) => {
    const recipe = {
        recipe_name: _req.body.recipe_name,
        recipe_instructions: _req.body. recipe_instructions,
        ingredient1: _req.body.ingredient1, 
        ingredient2: _req.body.ingredient2,
        ingredient3: _req.body.ingredient3,
        ingredient4: _req.body.ingredient4,
        ingredient5: _req.body.ingredient5,
        ingredient6: _req.body.ingredient6,
        ingredient7: _req.body.ingredient7,
        ingredient8: _req.body.ingredient8,
        ingredient9: _req.body.ingredient9,
        ingredient10: _req.body.ingredient10,
    };
    connect.getCollection().insertOne(recipe)
    .then(function(count) {
      if(count.acknowledged) {
        _res.status(201).json(count);
      } else {
        _res.status(500).json(count.error || 'Some error occurred while creating the Recipe.');
        _res.status(401);
      }
    });
});

//Replace Recipe by ID
routes.put('/:id', requiresAuth(), validation.saveRecipe, (_req, _res) => {
  if (!OjectId.isValid(_req.params.id)) {
    _res.status(400).json('Must use a valid contact id to update a Recipe.');
  }
    const putId = new OjectId(_req.params.id);
    const recipe = {
      recipe_name: _req.body.recipe_name,
      recipe_instructions: _req.body. recipe_instructions,
      ingredient1: _req.body.ingredient1, 
      ingredient2: _req.body.ingredient2,
      ingredient3: _req.body.ingredient3,
      ingredient4: _req.body.ingredient4,
      ingredient5: _req.body.ingredient5,
      ingredient6: _req.body.ingredient6,
      ingredient7: _req.body.ingredient7,
      ingredient8: _req.body.ingredient8,
      ingredient9: _req.body.ingredient9,
      ingredient10: _req.body.ingredient10,
  };
    connect.getCollection().replaceOne({ _id: putId }, recipe)
    .then(function(count) {
      console.log(count)
      if (count.modifiedCount > 0) {
        _res.status(204).send();
      } else {
        _res.status(500).json(count.error || 'Some error occurred while updating a Recipe.');
        _res.status(401);
      }
    });
});

//Delete Recipe by ID
routes.delete('/:id', requiresAuth(), (_req, _res) => {
  if (!OjectId.isValid(_req.params.id)) {
    _res.status(400).json('Must use a valid contact id to delete a Recipe.');
  }
    const deleteId = new OjectId(_req.params.id);
    connect.getCollection().deleteOne({ _id: deleteId },true)
    .then(function(count) {
      console.log(count)
      if (count.deletedCount > 0) {
        _res.status(205).send();
      } else {
        _res.status(500).json(count.error || 'Some error occurred while deleting a Recipe.');
        _res.status(401);
      }
    });
});


module.exports = routes;