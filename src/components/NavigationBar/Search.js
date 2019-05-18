import React from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import {store} from "../../index";
import {searchAction} from '../../actions/search-mode-action';
import $ from "jquery";
import {getUsersSearchResult} from "../../actions/search-result-action";

class SearchPage extends React.Component {

    toSearchMode() {
        const searchInput = document.querySelector('#search').value;
       // sessionStorage.setItem("search", searchInput);
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


{/*<MDBCol md="6">*/}
    {/*<form  className="form-inline mt-4 mb-4">*/}
        {/*<MDBIcon icon="search"/>*/}
        {/*<input id='search' className="form-control form-control-sm ml-3 w-75" type="text"*/}
               {/*placeholder="Search on Jupitter" aria-label="Search"/>*/}
        {/*<input onClick={this.toSearchMode} type="submit" value="Search"/>*/}
    {/*</form>*/}
{/*</MDBCol>*/}