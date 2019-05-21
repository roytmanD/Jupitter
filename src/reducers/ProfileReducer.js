export function profileReducer(state = false, action) {
    if (action.type === 'closeProfile') {
        return {username: false};
    }else if(action.type === 'toProfile'){

            return {username: action.payload.username};
    }else{
        console.log(state);
        return {username: state};
    }
}