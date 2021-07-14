// const { recipeValidations } = require('./recipeValidations')

function validation(value, name, recipeValidations) {
    let isMsgShowing = false;
    const inputsWithArr = ["categories", "diets", "instructions", "ingredients"]
    if (inputsWithArr.includes(name) && value.length < 1) {
        isMsgShowing = true;
    } else if (value === "") {
        isMsgShowing = true
    } else if (recipeValidations[name].isRequired && (recipeValidations[name].pattern).test(value)) {
        isMsgShowing = false
    }
    // else {
    //     isMsgShowing = true
    // }
    // console.log("isMsgShowing", isMsgShowing, name);
    return isMsgShowing;
}



const validationsFun = (recipeValidations) => {
    return function (req, res, next) {
        const { recipe, ingredients, instructions } = req.body;
        const oneDetailsObj = { ...recipe, ingredients, instructions }
        let inValid = false;
        for (const key in recipeValidations) {
            if (validation(oneDetailsObj[key], key, recipeValidations)) {
                inValid = true
            }
        }
        if (inValid) {
            res.json({ status: "failed", inputValidation: recipeValidations })
        } else {
            next()
        }
    }
}

module.exports = {
    validationsFun
};
