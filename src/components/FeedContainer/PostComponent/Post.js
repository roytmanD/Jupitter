import React from 'react';
import './Post.css';
import Like from './images/LIKE.png';
import Comment from './images/COMMENT.png';
import Rejupit from './images/REJUPIT.png';
import $ from 'jquery';

const BASE_URL = 'https://api.mlab.com/api/1/databases/jupitter';
const API_KEY = 'fsJGVMZJ2RYyINyuEhUMfuDgGzcBUEb3';

class Post extends React.Component{
constructor(props){
    super(props);

    this.state ={
        likes: this.props.activity.likes,
        rejupits: this.props.activity.rejupits,
        replies: this.props.activity.replies,
        deleted: false
    }
}

    renderPost = () =>{
        return (
            <div className='post'>
                <span className='author'>
                    <strong>{this.props.name}</strong>
                    | @{this.props.username} | {this.props.date}</span>
                <p>{this.props.text}</p>
                <span className='activity'>
                {this.props.activity.likes ? this.state.likes.length : 0} <img  onClick={this.handleLikeClick} className='activity' src={Like}/> {'   '}
                    {this.props.activity.rejupits ? this.props.activity.rejupits.length : 0} <img className='activity' src={Rejupit}/> {'   '}
                    {this.props.activity.replies ? this.props.activity.replies.length : 0} <img className='activity' src={Comment}/>{'   '}
                </span>
                {this.props.username===sessionStorage.getItem('currUser') ? <button onClick={this.deleteJupit} className='delete-jupit'>X</button> : null}
            </div>
        )
    }


   handleLikeClick = () => {
       const postId = this.props.postId;
       const url = `${BASE_URL}/collections/posts/${postId.$oid}?apiKey=${API_KEY}`;
       let likes = new Set(this.state.likes);
       const currUser = sessionStorage.getItem('currUser');
       console.log(this.props)
       console.log(likes);
       const OGquantity = likes.size;
       likes.add(currUser);

       console.log(likes.size, OGquantity);

       if (likes.size === OGquantity) {
           likes.delete(currUser);
       }
       let likesA = Array.from(likes);
       $.ajax({
           url: url,
           data: JSON.stringify( { "$set" : {activity: { "likes" : likesA, "rejupits": this.props.rejupits, "replies": this.props.replies  } }} ),
           type: 'PUT',
           contentType: 'application/json'
       }).then(res=>{
           console.log(res);
           this.setState({likes:likesA});
       });

   }

    deleteJupit = () => {
    const postId = this.props.postId;
    //TODO
        // what if not generate postId at the moment of creation,
        // but to get the objectKey from database at the moment of rendering instead?
        // DONE ok already doing like that
    const url = `${BASE_URL}/collections/posts/${postId.$oid}?apiKey=${API_KEY}`;
    $.ajax({
        url: url,
        type: 'DElETE',
        async: true,
        timeout: 300000,
        success: (data) => {
            console.log('removed successfully, data: ' + data);
            this.setState({deleted: true}); // redux store is not needed here at all
        },
        error: (xhr, status, err) =>{
            console.log(`ERROR !xhr: ${xhr}, status: ${status}, err: ${err}`);
            alert('Delete failed');
        }
    })
    }



    render() {
if(this.props.name!==undefined) {
    return (
        <div>
            {this.state.deleted ? null :  this.renderPost()}
        </div>
    )
}else{
    return(
    <div onClick={this.update}>
        No jupits found...
    </div>
    );
}
    }

}


export default Post;