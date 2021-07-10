const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const bodyPraser = require('body-parser')


const app = express();

const indexRouter = require('./routes/index');
const recipeInfo = require('./routes/recipeInfo');
const usersRouter = require('./routes/users');
const myRecipes = require('./routes/recipes');
const recipeNames = require('./routes/recipeNames');
const ingredientsName = require('./routes/ingredientNames');
const addUser = require('./routes/addUser');


app.use(cors({
    origin: "http://localhost:3000"
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyPraser.urlencoded())


app.use('/recipeInfo', recipeInfo);
app.use('/users', usersRouter);
app.use('/addUser', addUser);
app.use('/recipeNames', recipeNames);
app.use('/recipes', myRecipes);
app.use('/ingredientsName', ingredientsName);
app.use('/', indexRouter);


module.exports = app;

