export function searchReducer(state = {for: 'posts', by: false}, action) {
    switch (action.type) {
        case 'search':
            return {...state, for: state.for, by: action.payload.by};
        case 'subj':
            return {...state, for: action.payload.for, by: state.by}
        case 'cancelSearch':
            return {...state,for: 'posts', by: false};
        case 'toProfile':
            return {...state, for: 'posts', by: false}
        default:

            return {...state};

    }
}