
const initState = {
    person: {
        person_id: undefined,
        fullname: undefined,
        avatarLink: undefined,
        email: undefined
    },
    currentTopic: {
        topic_id: undefined,
        topicTitle: undefined
    },
    topicList: [],
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

        case 'currentTPL':
            return {
                ...state,
                topicList: action.payload
            }
        case 'currentTP':
            return {
                ...state,
                currentTopic: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;