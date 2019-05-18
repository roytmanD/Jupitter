export function getUsersSearchResult(usersList) {
    return (
        {type: 'users',
        payload: {
            users: usersList
        }}
    );

}