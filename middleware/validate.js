const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    password: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveRecipe = (req, res, next) => {
  const validationRule = {
    recipe_name: 'required|string',
    recipe_instructions: 'required|string',
    ingredient1: 'required|string', 
    ingredient2: 'required|string',
    ingredient3: 'required|string',
    ingredient4: 'required|string',
    ingredient5: 'required|string',
    ingredient6: 'string',
    ingredient7: 'string',
    ingredient8: 'string',
    ingredient9: 'string',
    ingredient10: 'string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};
module.exports = {
  saveUser,
  saveRecipe
};