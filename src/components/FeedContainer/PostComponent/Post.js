import React from 'react';



class Post extends React.Component{
constructor(props){
    super(props);
}

//     createPost = () =>{
//     return(<div className='post'>
//                 <span className='author'>
//                     <strong>{this.props.author.name}</strong>
//                     @{this.props.author.username} | {this.props.date}</span>
//         <textarea>{this.props.text}</textarea>
//         <span className='activity'>
//                     {this.props.activity.likes.length} Likes
//             {this.props.activity.rejupits.length} Rejupits
//             {this.props.activity.replies.length} Replies
//                 </span>
//     </div>);
// }

    update = () =>{
    this.forceUpdate();
    }

    render() {
console.log(this.props);
if(this.props.name!==undefined) {
    return (
        <div className='post'>
                <span className='author'>
                    <strong>{this.props.name}</strong>
                    @{this.props.username} | {this.props.date}</span>
            <textarea>{this.props.text}</textarea>
            <span className='activity'>
                    {this.props.activity.likes.length} Likes
                {this.props.activity.rejupits.length} Rejupits
                {this.props.activity.replies.length} Replies
                </span>
        </div>
        )
}else{
    return(
    <div onClick={this.update}>
        huypizda
    </div>
    );
}
    }

}


export default Post;