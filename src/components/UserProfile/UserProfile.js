import React from 'react';
import $ from 'jquery';
import './UserProfile.css';
import background_pic from './images/BACKGROUND_IMG.jpg';
import {logoutAction} from "../../actions/auth-action";
import {store} from "../../index";
import USER_PIC from './images/IMG_PROFILE.png';


const BASE_URL = 'https://api.mlab.com/api/1/databases/jupitter';
const API_KEY = 'fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';


class UserProfile extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            jupits: [],
            followers: [],
            following: [],
            name: '',
            bio: ''
        }
    }

    logOut = () =>{
        sessionStorage.removeItem('authStatus');
        sessionStorage.removeItem('currUser');
        store.dispatch(logoutAction);
    }

    componentDidMount(){
        let query = {username: this.props.username};
        let url = `${BASE_URL}/collections/users?q=${JSON.stringify(query)}&apiKey=${API_KEY}`;
        $.ajax({url}).then(response=>{

            query = {"author.username": this.props.username};
            url = `${BASE_URL}/collections/posts?q=${JSON.stringify(query)}&c=true&apiKey=${API_KEY}`;
            $.ajax({url}).then(res=>{
                this.setState({
                    jupits: res,
                    followers: response[0].followers,
                    following: response[0].following,
                    bio: response[0].bio,
                    name: response[0].name
                });
            })
        });
    }

    render() {

        return(
            <div className='user-profile'>
                <div className='background-container'>
                <img className='profile-background' src={background_pic} alt='background'/>
                    <div className='picture-name-container'>
                        <img className='profile-avatar' src={USER_PIC} alt='avatar'/>
                        <p><strong>{`${this.state.name}`}</strong>{` | @${this.props.username}`}</p>
                        <p className='profile-bio'>{this.state.bio}</p>
                        <button className='profile-follow'>Follow</button>
                    </div>
                </div>
                  <div className='user-info'>
                    <a className='numbers' href='#'>{this.state.jupits}</a> Jupits
                   <a className='numbers' href='#'> {this.state.followers.length}</a> Followers
                    <a className='numbers' href='#'>{this.state.following.length}</a> Following
                      {  store.getState().profile.username === sessionStorage.getItem('currUser') ?
                          <button className='sign-out' onClick={this.logOut}>Sign out</button> : null }
                  </div>
            </div>
        );
    }

}


export default UserProfile

