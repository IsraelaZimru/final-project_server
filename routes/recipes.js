var express = require('express');

const api = require('../DAL/api'); //fun that actully sending HTTP reqs.

var router = express.Router();
// const fs = require('fs')
// const path = require('path');

// let rawdata = fs.readFileSync(path.resolve(__dirname, 'recipes.json'));
// let recipesData = JSON.parse(rawdata);

/* GET users listing. */
router.get('/', async function (req, res) {  //router ==app.get but with more thing...
    const recipes = await api.recipes();
    res.json(recipes);
});

// router.get('/:recipeId', function(req,res){
//     recipesData[req.params.recipeId]
// })
module.exports = router;
