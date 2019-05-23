export const authAction = (curr_$oid, username, following) =>  ({
    type: 'in',
    payload:
        {
            status: 'AUTH',
            username: username,
            $oid: curr_$oid,
            following: following
        }
});

export const logoutAction = {
    type: 'out',
    payload:
        {status: 'NON-AUTH'}
};

