import React from 'react';



class UserProfile extends React.Component {
    render() {


        return(
            <div className='user-profile'>
                <span><img className='profile-background'/></span>
                <span className='profile-info'>{} Jupits {} Followers {} Following <button>Follow/Edit</button></span>
            </div>
        );
    }

}


export default UserProfile;