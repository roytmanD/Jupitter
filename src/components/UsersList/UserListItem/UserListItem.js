import React from 'react';
import './UserListItem.css';
import $ from 'jquery';


const BASE_URL = 'https://api.mlab.com/api/1/databases/jupitter';
const API_KEY = 'fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';

class UserListItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: this.props.user,
            followers: this.props.user.followers
        }
    }

    renderUserListItem = () => {
        return (
            <div className='user'>
            <a href={`jupitter/profile/${this.state.user.username}`} className='user-list-item'>
                        <span className='name-username'>
                    <strong>{this.state.user.name + ' '}</strong>
                            | @{this.state.user.username} </span> </a>
            <span className='flw'>{this.state.followers.length} Followers | {this.state.user.following.length} Following</span>

        {this.state.user.username === sessionStorage.getItem('currUser') ? null :
            <button className='user-list-item' onClick={this.handleFollowBtnClick}>
                {this.state.followers.indexOf(sessionStorage.getItem('currUser'))>=0 ? "Unfollow" : "Follow"}
            </button> }
            </div>
        );
    }

    handleFollowBtnClick = () => {
        let followers = new Set(this.state.user.followers);
        let fq = followers.size;
        followers.add(sessionStorage.getItem('currUser'));

        if(followers.size === fq){ //case: curr already follows this user
            followers.delete(sessionStorage.getItem('currUser'));
        }
        let followersA = Array.from(followers);

        let query = {"username": this.state.user.username};
        let url = `${BASE_URL}/collections/users?q=${JSON.stringify(query)}&apiKey=${API_KEY}`;
        $.ajax({
            url: url,
            data: JSON.stringify({ "$set" :  { "followers" : followersA}}),
            type: 'PUT',
            contentType: 'application/json'

        }).then(response =>{
            console.log(response);
            // this.setState({...this.state, followers: followersA});
            this.setState({followers:followersA});
        })


    }

    render() {

        console.log(this.state.user);

        return(
                <div className='user-list-item'>
                    {this.renderUserListItem()}
                </div>
        );
    }
}


export default UserListItem;