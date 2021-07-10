const express = require('express');
const api = require('../DAL/api');
const router = express.Router();


router.get('/', async function (req, res) {
    const names = await api.onlyRecipesName();
    res.json(names);
});


module.exports = router;
