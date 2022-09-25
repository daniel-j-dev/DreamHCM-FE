//const axios = require('axios').default;

type UserData = {
    email: string,
    password: string
}

export const signIn = (formValues: Object): Object => {
    const fv = formValues as UserData;

    if (fv === null)
        return {}

    console.log(fv.email)
    return {}
}

export const signUp = (formValues: Object) => {
    const fv = formValues as UserData;

    if (fv === null)
        return {}

    console.log(fv.email)
    return {}
}