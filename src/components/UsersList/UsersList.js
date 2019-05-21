import React from 'react';
import $ from "jquery";
import {store} from "../../index";
import uuid from 'uuid';
import './UserList.css';
import UserListItem from "./UserListItem/UserListItem";

const BASE_URL = 'https://api.mlab.com/api/1/databases/jupitter';
const API_KEY = 'fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';


class UsersList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            users: [],
            keyword: store.getState().search.by
        }
    }
    getUserListBy = (keyword) =>{
        const query = {"username" : {$regex : `.*${keyword}.*`}};
        const url = `${BASE_URL}/collections/users?q=${JSON.stringify(query)}&apiKey=${API_KEY}`;

        $.ajax({url: url}).then(response=>{
            if(response.length===0){
                alert('no users found!! gottcha render some shit instead');
            }else{
                // store.dispatch(getUsersSearchResult(response));
                this.setState({users:response, keyword: store.getState().search.by});
            }
        })
    };

    render() {

        if(this.state.users.length === 0 || store.getState().search.by !== this.state.keyword){
            this.getUserListBy(store.getState().search.by);
        }

        return(
          <div className='users-list'>
              <ul className='users-list'>
                  {this.state.users.map(user =>
                      <li className='user-list-item' key={`user${uuid()}`}>
                        <UserListItem user={user}/>
                      </li>

                  )}
              </ul>
          </div>

        );
    }
}


export default UsersList;

