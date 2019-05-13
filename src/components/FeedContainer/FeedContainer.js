import React from 'react';
import './FeedContainer.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import $ from 'jquery';
import Post from './PostComponent/Post';
import uuid from 'uuid';

const BASE_URL = 'https://api.mlab.com/api/1/databases/jupitter';
const API_KEY = 'fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';
let   items =[];
let load = 15;
let skip = 0;

 class FeedContainer extends React.Component{

    static displayName = "FeedContainer";


    fetchPosts(author = 'from all'){


    let url = `${BASE_URL}/collections/posts?s={"absoluteRelevance":1}&sk=${skip}&l=${load}&apiKey=${API_KEY}`


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

        });

        skip+=load;
   }

    render() {

        return(
            <div className="feed-container">
                <InfiniteScroll
                dataLength={1}
                next={this.fetchPosts}
                loader={<h4>Loading...</h4>}
                hasMore={true}
                endMessage='Jupitter out of posts!'
                refreshFunction={this.refresh}
                >
                    {items.map(item=>
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
    }
}


export default FeedContainer;