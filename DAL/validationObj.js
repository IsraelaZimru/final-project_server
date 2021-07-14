const userValidations = {
    email: { isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg: [], value: "", isInVaild: false },
    firstName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
    lastName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
    password: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
}


const recipeValidations = {
    recipeName: { isRequired: true, pattern: /\w{3,}/, msg: [], value: "", isInVaild: false },
    description: { isRequired: true, pattern: /[\s\S]{5,110}/, msg: [], value: "", isInVaild: false },
    Servings: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
    CookingTime: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
    prepTimeMins: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
    level: { isRequired: true, pattern: /\d/, msg: [], value: "", isInVaild: false },
    diets: { isRequired: true, pattern: /\d/, isInVaild: false },
    categories: { isRequired: true, pattern: /\d/, isInVaild: false },
    instructions: { isRequired: true, pattern: /\d/, isInVaild: false },
    ingredients: { isRequired: true, pattern: /\d/, isInVaild: false }, //diets & categories
}


module.exports = {
    userValidations,
    recipeValidations
}