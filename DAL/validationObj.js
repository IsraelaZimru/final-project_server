const validations = {
    email: { isRequired: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, msg: [], value: "", isInVaild: false },
    firstName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
    lastName: { isRequired: true, pattern: /\w{2,}/, msg: [], value: "", isInVaild: false },
    password: { isRequired: true, pattern: /[\s\S]{2,}/, msg: [], value: "", isInVaild: false },
}

function validation(value,name)


module.exports = validation;