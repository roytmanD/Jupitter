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
                alert('Welcome!');
                sessionStorage.setItem('authStatus', 'AUTH');
                sessionStorage.setItem('currUser', res[0].username);
                sessionStorage.setItem('currName', res[0].name);
                console.log(res);
                store.dispatch(authAction);
            }
        })
    }

    render() {
        return(
            <Form className='login-form'>
                <h1 className='text-center'>Join Jupitter!</h1>

                <FormGroup>
                    <Label>Email</Label>
                    <Input id='username' type='text' placeholder='Username'/>
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input id='password' type='password' placeholder='Password'/>
                </FormGroup>

                <Button onClick={this.logIn} className='btn-lg btn-dark btn-block'>Log in</Button>
                <div className='text-center pt-3'>Or continue with</div>
                <GoogleLoginButton className='mt-3 mb-3'/>
                <div className='text-center'>
                    <a href='/sign-up'>Sign up</a>
                    <span className='p-2'></span>
                </div>
            </Form>
        );
    }

}

export default Login;