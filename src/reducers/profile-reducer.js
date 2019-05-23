export function profileReducer(state = false, action) {
    if (action.type === 'closeProfile') {
        return {...state, username: false};
    }else if(action.type === 'toProfile'){
            return {...state,for: 'posts', by: false, username: action.payload.username};
    }else if(action.type==='out'){
        return {...state,status: 'NON-AUTH', username: false}
    }else if(action.type === 'search'){
        return {...state, username: false}
    } else{
        return {...state};
    }
}