import React from 'react';
import './UserListItem.css';
import $ from 'jquery';
import {store} from "../../../index";
import {profileAction} from "../../../actions/profile-action";
import {cancelSearchAction} from "../../../actions/search-mode-action";


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
                <a href='#' onClick={(e)=>{this.toProfile(e)}} className='post'>
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
        //add/remove 'following' to current. I do it firstly cause it's asynchronous and doesn't take mutch time from
        //setting new state to follow/unfollow btn, whether the api call for putting new followers list setsState and would make
        //second api call unreachable
        let following = new Set(this.props.user.following);
        let followingQ = following.size;

        console.log(following);
        following.add(this.state.user.username);
console.log(following);
        if(following.size === followingQ){
            following.delete(this.state.user.username);
        }
        let query = {"username": sessionStorage.getItem('currUser')};
        let url = `${BASE_URL}/collections/users?q=${JSON.stringify(query)}&apiKey=${API_KEY}`;
        $.ajax({
            url:url,
            data: JSON.stringify({"$push": {"following": this.state.user.username}}),
            type: 'PUT',
            contentType: 'application/json'
        }).then(response=>{
            console.log(response);

        });

        //add/remove follower to user from userList
        let followers = new Set(this.state.user.followers);
        let fq = followers.size;
        followers.add(sessionStorage.getItem('currUser'));

        if(followers.size === fq){ //case: curr already follows this user
            followers.delete(sessionStorage.getItem('currUser'));
        }
        let followersA = Array.from(followers);

         query = {"username": this.state.user.username};

         //TODO mb instead of setting the final array just push/pull currUser's username? a bit more code
         url = `${BASE_URL}/collections/users?q=${JSON.stringify(query)}&apiKey=${API_KEY}`;
        $.ajax({
            url: url,
            data: JSON.stringify({ "$set" :  { "followers" : followersA}}),
            type: 'PUT',
            contentType: 'application/json'

        }).then(response =>{
            console.log(response);
            this.setState({followers:followersA});
        });



    }

    toProfile = (e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        store.dispatch(cancelSearchAction);
        store.dispatch(profileAction(this.state.user.username));
    }

    render() {
        return(
                <div className='user-list-item'>
                    {this.renderUserListItem()}
                </div>
        );
    }
}


export default UserListItem;