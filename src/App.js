import React from 'react';
import './App.css';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import {connect} from "react-redux";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {store} from './index';

//from main cont
import FeedContainer from "./components/FeedContainer/FeedContainer";
import NavigationBar from './components/NavigationBar/NavigationBar';
import {Container, Row, Col, Navbar} from 'reactstrap';
import uuid from 'uuid';

import Modal from 'react-modal';

import {closeJupitModalAction} from "./actions/jupit-modal-action";
import {authAction} from "./actions/auth-action";
import {Input, InputGroup, Button} from 'reactstrap';

import $ from 'jquery';

const BASE_URL = 'https://api.mlab.com/api/1/databases/jupitter';
const API_KEY = 'fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};
const sessionStorage = window.sessionStorage;

Modal.setAppElement('#root');

class App extends  React.Component{


    handleClose = () => {
        store.dispatch(closeJupitModalAction);
    };

    submitJupit = () =>{
        const jupitInput = document.querySelector('#jupitInput').value;
        const id = 'p' + uuid();


        const currentDate = new Date();
        const date = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`

        const absoluteRelevance = -Math.floor( Date.now() / 1000 ); //negative cause the more seconds gone since Epoch,
                                                                       // the less relevant is the post
        let jupitData = {
            postId: id,
            text: jupitInput,
            type: 'post',
            absoluteRelevance: absoluteRelevance,
            date: date,
            author:
                {
                    name: sessionStorage.getItem('currName'),
                    username: sessionStorage.getItem('currUser')
                },
            activity:
                {
                    likes: [],
                    rejupits: [],
                    replies: []
                }
            }

            const url = `${BASE_URL}/collections/posts?apiKey=${API_KEY}`;
        console.log(BASE_URL);
console.log(url);
        $.ajax({
            url: url,
            data: JSON.stringify(jupitData),
            type: 'POST',
            contentType: 'application/json'
        }).then(res=>{
            console.log(res);
            alert('Your jupit was submited!');
            //TODO after jupit was saved to db It should appear at the top of feed => we need to update feed => to dispatch action
            this.handleClose();
        });

}
    render() {


            if (sessionStorage.getItem('authStatus') !== this.props.authorization.status) {
                store.dispatch(authAction);
            }

if(this.props.authorization.status === 'AUTH'){
    return (
    <div className="App">
        <Container>
            <Navbar><NavigationBar/></Navbar>
            <Row>
                <div>
                    <Modal style= {customStyles} isOpen={this.props.jupitModal.isOpen}>
                   <h1>New jupit</h1>
                        <InputGroup>
                            <Input id='jupitInput' placeholder="What's new?"/>
                            <Button onClick={this.submitJupit}><strong>Jupit</strong></Button>
                        </InputGroup>
                    <button onClick={this.handleClose}>close</button>
                </Modal> </div>
                <FeedContainer/>
            </Row>
        </Container>
    </div>
  );
}else {
    return(
        <BrowserRouter>
            <div className='App'>
            <Switch>
                <Route path='/auth'><Login/></Route>
                <Route path='/sign-up'><Registration/></Route>
            </Switch>
            </div>
        </BrowserRouter>
    );
}
}
}


const mapStateToProps = state => ({
    authorization: state.authorization,
    jupitModal: state.jupitModal
});

export default connect(mapStateToProps)(App);
