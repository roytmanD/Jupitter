import React from 'react';
import './FeedContainer.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import $ from 'jquery';
import Post from './PostComponent/Post';
import uuid from 'uuid';
import {store} from '../../index';


const BASE_URL = 'https://api.mlab.com/api/1/databases/jupitter';
const API_KEY = 'fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';
let load = 5;
let skip = 0;

class FeedContainer extends React.Component{
constructor(props){
    super(props);

    this.state = {
        keyword: store.getState().search.by,
        items:[]
    }
}
    static displayName = "FeedContainer";


    fetchPosts = () =>{
  let items=[];
    let url = `${BASE_URL}/collections/posts?s={"absoluteRelevance":1}&sk=${skip}&l=${load}&apiKey=${API_KEY}`

         if(store.getState().search.by){
            let q = {text:  {$regex : `.*${store.getState().search.by}.*`}};
            url = `${BASE_URL}/collections/posts?q=${JSON.stringify(q)}&s={"absoluteRelevance":1}&sk=${skip}&l=${load}&apiKey=${API_KEY}`;
    }

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
                }
                items.push(postData);
            });

             console.log(items);
            // if(!store.getState().search.by) {
            //     this.setState({items: this.state.items.concat(items)});
            // }else{
            //     this.setState({items:items});
            // }
            this.setState({items: this.state.items.concat(items)});
            skip+=load;
        });
   }



    render() {

if(!store.getState().search.by) {
    return (
        <div className="feed-container">
            <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchPosts}
                loader={<h4>Loading...
                    <progress/>
                </h4>}
                hasMore={true}
                endMessage='Jupitter out of posts!'
                refreshFunction={this.refresh}
            >
                {this.state.items.map(item =>
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
        dataLength={this.state.items.length}
        next={this.fetchPosts}
        loader={<h4>Loading...
            <progress/>
        </h4>}
        hasMore={true}
        endMessage='Jupitter out of posts!'
        refreshFunction={this.refresh}
    >
        {this.state.items.map(item =>
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