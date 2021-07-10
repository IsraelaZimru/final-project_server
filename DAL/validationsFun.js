//  אפשר להעתיק ממה שעשיתי בלקיינט -המטרה היא לבצע וולידציה גנרית לפני שאני נכנסת ל-סיקוול

const validationsFun = (validationObj) => {
    return function (req, res, next) {
        const user = req.body;

        let inValid = false;
        for (const key in validationObj) {
            if (validation(user[key], key, validationObj)) {
                inValid = true
            }
        }
        if (inValid) {
            res.json({ status: "failed", inputValidation: validationObj })
        } else {
            next()
        }
    }
}

module.exports = validationsFun;
