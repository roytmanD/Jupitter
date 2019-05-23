export const addToFollowingAction = (username) => ({
   type: 'add',
    payload: username

});

export const removeFromFollowingAction = (username) => ({
    type: 'remove',
    payload: username
});