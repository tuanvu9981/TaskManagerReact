export const signInAction = (signInData) => {
    return {
        type: "signIn",
        payload: signInData
    }
}

export const signUpAction = (signUpData) => {
    return {
        type: "signUp",
        payload: signUpData
    }
}

export const logoutAction = () => {
    return {
        type: "logout"
    }
}

export const setCurrentTopicList = (newTopicList) => {
    return {
        type: "currentTPL",
        payload: newTopicList
    }
}