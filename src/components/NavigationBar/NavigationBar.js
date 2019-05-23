import React from 'react';
import './Navigation.css';
import jup_logo from "./images/IMG_JUP.PNG";
import home from "./images/IMG_HOME.PNG";
import notification from "./images/IMG_NOTIFICATION.png";
import messages from "./images/IMG_MSG.PNG";
import def_profile_pic from "./images/IMG_PROFILE.png";
import Search from './Search';
import {Button} from "reactstrap";

import {store} from '../../index';
import {openJupitModalAction} from "../../actions/jupit-modal-action";
import {closeProfile, profileAction} from "../../actions/profile-action";

class NavigationBar extends React.Component{


    openModal = () => {
        store.dispatch(openJupitModalAction);
    }

    handleHomeClick = () =>{
        store.dispatch(closeProfile);
    }

    toProfile = (e) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        store.dispatch(profileAction(sessionStorage.getItem('currUser')));
    }

    render() {
        return(
            <div className="navigation-bar">
                <div onClick={this.handleHomeClick}><img id='home' src={home} alt='Home'/>Home</div>
                <div><img id="notifications" src={notification} alt='Notifications'/>Notifications</div>
                <div><img id="msg" src={messages} alt='Messages'/>Messages</div>
                <img id='logo' src={jup_logo} alt='jupitter-logo'/>
                <div><Search id='search'/></div>
                <div>
                    <img onClick={(e)=>{this.toProfile(e)}} id='profile_pic' src={def_profile_pic} alt='Profile picture'/>
                </div>
                <Button onClick={this.openModal}><strong>Jupit</strong></Button>
            </div>
        );
    }

}


export default NavigationBar;