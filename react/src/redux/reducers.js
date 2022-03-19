
const initState = {
    person: {
        person_id: undefined,
        fullname: undefined,
        avatarLink: undefined,
        email: undefined
    },
    topic_id: undefined,
    task_id: undefined
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'signIn':
        case 'signUp':
            return {
                ...state,
                person: action.payload
            }

        case 'logout':
            return initState;
        default:
            return state;
    }
}

export default rootReducer;