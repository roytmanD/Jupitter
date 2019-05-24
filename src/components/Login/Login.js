import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {GoogleLoginButton} from "react-social-login-buttons";
import $ from 'jquery';
import {BASE_URL, API_KEY} from "../Registration/Registration";
import {store} from "../../index";
import {authAction} from '../../actions/auth-action';

class Login extends React.Component{


    logIn(){
        const usernameInput = document.querySelector('#username').value;
        const pwdInput = document.querySelector('#password').value;
        const q = {
                username: usernameInput,
                password: pwdInput
        };

        let url = `${BASE_URL}/collections/users?q=${JSON.stringify(q)}&apiKey=${API_KEY}`;
        $.ajax({url}).then(res=>{
            if(res.length===0){
                alert('Invalid login or password');
            }else{
                //before alerting it's a nice place to start asycn action to finish while user is killing the alert
                //gonna receive currUsers 'following' list to specify his home feed by their usernames

                //i guess we do have users object id in response so it's a good idea to use it for following request and even to save in state
                // url = `${BASE_URL}/collections/users`;
                console.log(res[0]._id.$oid);
                alert('Welcome!');
                sessionStorage.setItem('authStatus', 'AUTH');
                sessionStorage.setItem('currUser', res[0].username);
                sessionStorage.setItem('currName', res[0].name);
                console.log(res);

                store.dispatch(authAction(res[0]._id.$oid, res[0].username, res[0].following));
            }
        })
    }

    render() {
        return(
            <form className='login-form'>
                <h1 className='text-center'>Join Jupitter!</h1>

                <FormGroup>
                    <label>Username</label>
                    <input  id='username' type='text' placeholder='Username'/>
                </FormGroup>

                <FormGroup>
                    <label>Password</label>
                    <input id='password' type='password' placeholder='Password'/>
                </FormGroup>

                <button onClick={this.logIn} className='btn-lg btn-dark btn-block'>Log in</button>
                <div className='text-center pt-3'>Or continue with</div>
                <GoogleLoginButton className='mt-3 mb-3'/>
                <div className='text-center'>
                    Already have account?
                    <a href='/sign-up'>Sign up</a>
                    <span className='p-2'></span>
                </div>
            </form>
        );
    }

}

export default Login;