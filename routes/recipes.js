const routes = require('express').Router();
const { response } = require('express');
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
  });
});

//Get One Recipe
routes.get('/:id', requiresAuth(), (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
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
    const results = connect.getCollection().insertOne(recipe);
    console.log(results);
    if(results.acknowledged) {
      res.status(201).json(results);
    } else {
      res.status(500).json(results.error || 'Some error occurred while creating the Recipe.');
    }
});

//Replace Recipe by ID
routes.put('/:id', requiresAuth(), validation.saveRecipe, (_req, _res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a Recipe.');
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
    const results = connect.getCollection().replaceOne({ _id: putId }, recipe);
    console.log(results);
    if(results.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(results.error || 'Some error occurred while updating a Recipe.');
    }
});

//Delete Recipe by ID
routes.delete('/:id', requiresAuth(), (_req, _res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a Recipe.');
  }
    const deleteId = new OjectId(_req.params.id);
    const results = connect.getCollection().deleteOne({ _id: deleteId },true);
    console.log(results);
    if(results.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(results.error || 'Some error occurred while deleting the Recipe.');
    }
});

module.exports = routes;