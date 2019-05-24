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
import Navbar from "reactstrap/es/Navbar";
import NavLink from "reactstrap/es/NavLink";
import NavItem from "reactstrap/es/NavItem";

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
                <ul className='nav-ul'>
                <li><a onClick={this.handleHomeClick}>Home</a></li>
                <li><a>Notifications</a></li>
                <li><a>Messages</a></li>
                </ul>
                <img id="jupitter" src={jup_logo} alt='jupitter-logo'/>
                <div className='search-jupit-profile'>
                <div className='jupitter-search'><Search id='search'/></div>
                <div className='nav-profile'>
                    <img onClick={(e)=>{this.toProfile(e)}} id='profile_pic' src={def_profile_pic} alt='Profile picture'/>
                </div>
                <button className="jupit-btn" onClick={this.openModal}><strong>Jupit</strong></button>
                </div>
            </div>
        );
    }

}


export default NavigationBar;


