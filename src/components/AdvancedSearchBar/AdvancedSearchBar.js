import React from 'react';
import './AdvancedSearchBar.css';

import {store} from "../../index";
import {cancelSearchAction} from '../../actions/search-mode-action';
import {changeTo} from "../../actions/search-subj-action";


class AdvancedSearchBar extends React.Component{

    handleSearchBy = (e, subj) =>{
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
                store.dispatch(changeTo(subj));
        }


    cancelSearch = () => {
        store.dispatch(cancelSearchAction);
    }

    render() {
        return (
            <div className='advanced-search'>
                <button className='cancel-search' onClick={this.cancelSearch}><strong>X</strong></button>
                <span className='keyword-bar'>Search by: {store.getState().search.by}</span>
                <span className='search-by'>
                    <ul className='advanced-search'>
                        <li><a  onClick={e=> this.handleSearchBy(e,'posts')}>By posts</a></li>
                        <li><a  onClick={e=> this.handleSearchBy(e,'users')}>By users</a></li>
                    </ul>

                </span>
            </div>
        );
    }

}


export default AdvancedSearchBar;