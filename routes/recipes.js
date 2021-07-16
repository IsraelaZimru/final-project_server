const express = require('express');
const api = require('../DAL/api'); //fun that actully sending HTTP reqs.
const router = express.Router();
const path = require('path')

// const {isExists} = require('../uti')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

router.post('/upload/:id', upload.single("image"), async function (req, res) {
    try {
        const { id } = req.params;
        const addImageToRecipe = await api.addImage(req.file.filename, id)
        console.log("addImageToRecipe", addImageToRecipe);
        console.log("Image Uploaded.this image url:", req.file.filename)
        res.status(200).json(id);
    } catch (err) {
        res.status(500).json("Image was not included in the request.")
    }
});


router.delete('/:id', async function (req, res) {  //router ==app.get but with more thing...
    const { id } = req.params;
    console.log("enter fun");
    const respone = await api.deleteRecipe(id);
    res.json(respone);
});



/* GET users listing. */
router.get('/', async function (req, res) {  
    const recipes = await api.recipes();
    res.json(recipes);
});





module.exports = router;
