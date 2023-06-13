const validator = require("validator");

const validate = (params) => {
    let name = !validator.isEmpty(params.name) &&
        validator.isLength(params.name, { min: 3, max: undefined }) &&
        validator.isAlpha(params.name, "es-ES");

    let surname = !validator.isEmpty(params.surname) &&
        validator.isLength(params.surname, { min: 3, max: undefined }) &&
        validator.isAlpha(params.surname, "es-ES");

    let email = !validator.isEmpty(params.email) &&
        validator.isEmail(params.email);

    let password = !validator.isEmpty(params.password);

    if(params.bio){
        let bio = validator.isLength(params.bio, { min: undefined, max: 255 });

        if (!bio) {
            throw new Error("No se ha superado la validación");
        } else {
            console.log("validacion superada");
        }
    }
   

    if (!name || !surname || !email || !password) {
        throw new Error("No se ha superado la validación");
    } else {
        console.log("validacion superada");
    }
}

module.exports = validate
