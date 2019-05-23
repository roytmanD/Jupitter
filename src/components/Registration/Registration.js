import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import $ from 'jquery';
import {authAction} from '../../actions/auth-action';
import {store} from "../../index";

export const BASE_URL='https://api.mlab.com/api/1/databases/jupitter';
export const API_KEY='fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';

class Registration extends React.Component{


    signUp(){
const emlInput = document.querySelector('#email').value;
const pwdInput = document.querySelector('#password').value;
const usernameInput = document.querySelector('#username').value;
const nameInput = document.querySelector('#name').value;
//const lastNameInput = document.querySelector('#lastName').value; //depricated
const bioInput = document.querySelector('#bio').value;

const userData = {
            email: emlInput,
            password: pwdInput,
            username: usernameInput,
            name: nameInput,
            bio: bioInput,
            followers: [],
            following: []
        }

        const q = {username: usernameInput}; //currently i check only if the user name unic, got to also check email
const query = JSON.stringify(q);
        let url = `${BASE_URL}/collections/users?q=${query}&apiKey=${API_KEY}`;
        $.ajax({url: url}).then(function (res) {
            if(res.length === 0){
                //if no such username add user data to DB
                let url = BASE_URL + "/collections/users?apiKey=" + API_KEY;
                $.ajax({
                        url:url,
                        data: JSON.stringify(userData),
                        type: 'POST',
                        contentType: 'application/json'
                    }
                ).then(res=>{
                    console.log(res);//TODO lets yet just monitor what comes here
                    alert(`Welcome to Jupitter, ${usernameInput}!`);
                    sessionStorage.setItem('authStatus', 'AUTH');
                    sessionStorage.setItem('currUser', usernameInput);
                    sessionStorage.setItem('currName',nameInput);
                    store.dispatch(authAction);
                });

            }else{
                alert(`Username '${usernameInput}' is already taken! Please, try another one.`)
            }
            
        });




    }


    render() {

        console.log(this.props);
        return(
            <Form className='registration-form'>
                <h1 className='text-center'>Create your Jupitter account</h1>

                <FormGroup>
                    <Label>Email</Label>
                    <Input id='email' type='email' placeholder='Email'/>
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input id='password' type='password' placeholder='Password'/>
                </FormGroup>

                <FormGroup>
                    <Label>Username</Label>
                    <Input id='username' type='text' placeholder='Username'/>
                </FormGroup>

                <FormGroup>
                    <Label>Name</Label>
                    <Input id='name' type='text' placeholder='Name'/>
                </FormGroup>
                <FormGroup>
                    <Label>Bio</Label>
                    <Input id='bio' type='text' placeholder='Bio'/>
                </FormGroup>
                <FormGroup>
                    <Label for='profile-pic'>Profile picture</Label>
                    <Input id='profile-pic'  name='file' type='file'/>
                </FormGroup>

                <Button onClick={this.signUp} className='btn-lg btn-dark btn-block'>Sign up</Button>
                <Label>Already have account?</Label>
                <a href='/auth'>Log in</a>

            </Form>
        );
    }

}

export default Registration;