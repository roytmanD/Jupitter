export function searchReducer(state = {for: 'posts', by: false}, action) {
    switch (action.type) {
        case 'search':
            return {for: state.for, by: action.payload.by};
        case 'subj':
            return {for: action.payload.for, by: state.by}
        case 'cancelSearch':
            return {by: false};
        default:

            return state;

    }
}