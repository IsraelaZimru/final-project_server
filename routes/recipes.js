var express = require('express');
var router = express.Router();
const fs = require('fs')
const path = require('path');

let rawdata = fs.readFileSync(path.resolve(__dirname, 'recipes.json'));
let recipesData = JSON.parse(rawdata);

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send(recipesData);
});

// router.get('/:recipeId', function(req,res){
//     recipesData[req.params.recipeId]
// })
module.exports = router;
