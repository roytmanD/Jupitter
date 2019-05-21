export const profileAction = (username) => ({
    type: 'toProfile',
    payload: {username: username}
});

export const closeProfile = {
    type: 'closeProfile',
    payload: false
}