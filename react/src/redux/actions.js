export const signIn = (signInData) => {
    return {
        type: "signIn",
        payload: signInData
    }
}

export const signUp = (signUpData) => {
    return {
        type: "signUp",
        payload: signUpData
    }
}

export const logout = () => {
    return {
        type: "logout"
    }
}