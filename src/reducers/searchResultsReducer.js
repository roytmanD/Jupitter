export function searchResultsReducer(state ={users:[{username: 'kolya69', name:'nikolas'}]}, action) {
    switch (action.type) {
        case 'users':

            return {};
        case "posts":

            return {};

        default:
            return {...state}
    }

}