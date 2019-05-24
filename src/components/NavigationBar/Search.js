import React from "react";
import {store} from "../../index";
import {searchAction} from '../../actions/search-mode-action';
import './Search.css'

class SearchPage extends React.Component {

    toSearchMode() {
        const searchInput = document.querySelector('#search').value;
        store.dispatch(searchAction(searchInput));
    }


    render() {


        return (
            <div>
                <form>
                   <input className='search-field' id='search' type='text' placeholder='Search on Jupitter'></input>
                    <input className='search-btn' onClick={this.toSearchMode} type='submit' value='search'/>
                </form>
            </div>
        );
    }
}
export default SearchPage;

