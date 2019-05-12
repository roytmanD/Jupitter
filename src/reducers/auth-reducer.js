
export function authReducer(state = {status: 'NON-AUTH'}, action){
    switch(action.type){
        case 'in':
            return {status: action.payload.status};

        default:
            return {status: state.status};
    }
}