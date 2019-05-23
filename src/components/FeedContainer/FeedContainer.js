import React from 'react';
import './FeedContainer.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import $ from 'jquery';
import Post from './PostComponent/Post';
import uuid from 'uuid';
import {store} from '../../index';
import {authAction} from "../../actions/auth-action";


const BASE_URL = 'https://api.mlab.com/api/1/databases/jupitter';
const API_KEY = 'fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';
let load = 5;
let skip = 0;

class FeedContainer extends React.Component{
constructor(props){
    super(props);

    this.state = {
        keyword: store.getState().search.by,
        items:[],
        specifiedItems:[],
        authorsToDisplay: []
    }
}
    static displayName = "FeedContainer";


    fetchPosts = () =>{
  let items=[];
        let query;
        let url;
        let authorsToDisplay =this.state.authorsToDisplay;
        if(store.getState().authorization.user === undefined) {
            const q = {
                username: sessionStorage.getItem('currUser'),
            };

            let url = `${BASE_URL}/collections/users?q=${JSON.stringify(q)}&apiKey=${API_KEY}`;
            $.ajax({url}).then(res=>{
                if(res.length ===0){
                    alert("ABSOLUTELY WEIRD ERROR! RRR")
                }else {
                    store.dispatch(authAction(res[0]._id.$oid, res[0].username, res[0].following));
                    this.setState({authorsToDisplay: res[0].following});
                }
            });

        }else{
            authorsToDisplay = store.getState().authorization.user.following;
        }
  authorsToDisplay.push(sessionStorage.getItem('currUser'));
   query = {"author.username": {$in : authorsToDisplay}}; //this query specifies who's posts to display
   url = `${BASE_URL}/collections/posts?q=${JSON.stringify(query)}&s={"absoluteRelevance":1}&sk=${skip}&l=${load}&apiKey=${API_KEY}`;

         // if(store.getState().search.by){
        if(this.props.username){
            // let q = {text:  {$regex : `.*${store.getState().search.by}.*`}};
            let q = {text:  {$regex : `.*${this.props.username}.*`}}; //TODO username? keyword must be here.
            url = `${BASE_URL}/collections/posts?q=${JSON.stringify(q)}&s={"absoluteRelevance":1}&sk=${skip}&l=${load}&apiKey=${API_KEY}`;
    }
        if(typeof store.getState().profile.username === 'string'){
     //       let q = {"author.username": store.getState().profile.username};
            skip=0;
            let q = {"author.username": store.getState().profile.username};
            url = `${BASE_URL}/collections/posts?q=${JSON.stringify(q)}&s={"absoluteRelevance":1}&sk=${skip}&l=${load}&apiKey=${API_KEY}`
        } // TODO specifying feed for inProfile mode. does not work yet.

        console.log(url);
        $.ajax({url}).then(response =>{
            response.forEach(postJson =>{

                let postData = {
                    postId: postJson._id,
                    text: postJson.text,
                    type: postJson.type,
                    date: postJson.date,
                    author:
                        {
                        name: postJson.author.name,
                        username: postJson.author.username
                        },
                    activity:
                        {
                            likes: postJson.activity.likes,
                            rejupits: postJson.activity.rejupits,
                            replies: postJson.activity.replies
                        }
                };
                items.push(postData);
            });

            skip+=load;
            if(this.props.username){
                this.setState({
                    specifiedItems: this.state.items.concat(items),
                    items: []
                });
            }else {
                this.setState({
                    items: this.state.items.concat(items),
                    specifiedItems: []
                });//TODO thats where the shit is going on. need to
            }
            });
   };



    render() {
    let itemsToRender = Array.from(this.state.items);
    if(typeof this.props.username === 'string'){
        itemsToRender = Array.from(this.state.specifiedItems);
    }

if(!store.getState().search.by) {
    return (
        <div className="feed-container">
            <InfiniteScroll
                dataLength={itemsToRender.length}
                next={this.fetchPosts}
                loader={<h4>Loading...
                    <progress/>
                </h4>}
                hasMore={true}
                endMessage='Jupitter out of posts!'
                refreshFunction={this.refresh}
            >
                {itemsToRender.map(item =>
                    <Post
                        text={item.text}
                        date={item.date}
                        name={item.author.name}
                        username={item.author.username}
                        activity={item.activity}
                        key={`post${uuid()}`}
                        postId={item.postId}
                    />
                )}
            </InfiniteScroll>
        </div>
    );
}else{
    return(
    <InfiniteScroll
        dataLength={itemsToRender.length}
        next={this.fetchPosts}
        loader={<h4>Loading...
            <progress/>
        </h4>}
        hasMore={true}
        endMessage='Jupitter out of posts!'
        refreshFunction={this.refresh}
    >
        {itemsToRender.map(item =>
            <Post
                text={item.text}
                date={item.date}
                name={item.author.name}
                username={item.author.username}
                activity={item.activity}
                key={`post${uuid()}`}
                postId={item.postId}
            />
        )}
    </InfiniteScroll>
    );
}
    }
}


export default FeedContainer;


//TODO search for only posts from the specified author

//store.getState().search.by
// if(author !== 'from all'){
//     let q = {author: author};
//     url = `${BASE_URL}/collections/posts?q=${JSON.stringify(q)}&s={"absoluteRelevance":1}&sk=${skip}&l=${load}&apiKey=${API_KEY}`;
// }