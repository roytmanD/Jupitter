export function searchAction(keyword){
    return {
        type: 'search',
        payload: {by: keyword}
    }
}

export const cancelSearchAction = {
     type: 'cancelSearch',
     payload: {by: false }
 }