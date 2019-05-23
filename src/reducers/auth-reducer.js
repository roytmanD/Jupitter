
export function authReducer(state = {status: 'NON-AUTH'}, action){
    switch(action.type){
        case 'in':
            return {
                ...state,
                status: action.payload.status,
                user: {
                    username: action.payload.username,
                    $oid: action.payload.$oid,
                    following: action.payload.following
                }
            };
        case 'add':
            console.log(action);
            console.log(state);
            return {
            ...state,
                following: state.user.following.push(action.payload.username)
                }

        case 'remove':
            return {
                ...state,
                following: state.user.following.delete(action.payload.username)
            }
        case 'out':
            return {
                status: 'NON_AUTH'
            }


        default:
            return {...state};
    }
}