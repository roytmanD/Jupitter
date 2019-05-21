import React from "react";
import {store} from "../../index";
import {searchAction} from '../../actions/search-mode-action';

class SearchPage extends React.Component {

    toSearchMode() {
        const searchInput = document.querySelector('#search').value;
        store.dispatch(searchAction(searchInput));
    }


    render() {


        return (
            <div>
                <input id='search' type='text' placeholder='Search on Jupitter'></input>
                <input onClick={this.toSearchMode} type='submit' value='search'/>
            </div>
        );
    }
}
export default SearchPage;

