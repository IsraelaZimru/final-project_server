const express = require('express');
const router = express.Router();
const db = require('../utils/database')
const api = require('../DAL/api'); //fun that actully sending HTTP reqs.
const path = require('path')
const { recipeValidations } = require('../DAL/validationObj')
const { validationsFun } = require('../DAL/validationsFun')
const upload = require('../utils/multer')

// const multer = require('multer')
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {

//         cb(null, 'public/images')
//     },
//     filename: (req, file, cb) => {
//         // console.log(file);
//         if (file) {
//             cb(null, Date.now() + path.extname(file.originalname))
//         }
//     }
// })

// const upload = multer({
//     storage: storage
// });


router.post('/', upload.none(), validationsFun(recipeValidations), async function (req, res) {
    const { recipe, ingredients, instructions } = req.body;
    const result = await api.addNewRecipe(recipe, ingredients, instructions);
    res.json(result);
    // res.send("okey!")


    // console.log("req.body", req.body);
    // console.log("Image Uploaded.this image url:", req.file.filename)
});


// router.post('/', async function (req, res) {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         res.status(401).json({ error: 'email or password incorrect' });
//         return;
//     }

//     try {
//         const result = await api.login(email, password);
//         if (result) {
//             res.cookie('user', result);
//             res.status(200).json(result);
//         }
//         else res.status(401).json({ error: 'email or password incorrect' });
//     } catch (error) {
//         res.status(500).json({
//             error: error.message
//         })
//     }
// });
// 
module.exports = router;
