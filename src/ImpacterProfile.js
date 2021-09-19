import React from 'react';
import ModalPost from './ModalPost.js';
import './ImpacterProfile.css';

class ImpacterProfile extends React.Component { 
  constructor(props) {
    super(props);
    this.state={
      posts:[],
      editModePostIndex:undefined,
      editedDescription:"",
      showPostInModal: false,
      modalModePostIndex:undefined
    };
    this.fetchPosts();
  }
  
  fetchPosts = () => {
    let url = "http://localhost:3001/impacters/" + this.props.impacterId + "/posts"
    fetch(url).then(res=>res.json()).then(
      result=>{
        this.setState({posts:result});
      }
    )
  }

  editPost = (description, postIndex) => {
    this.setState({
      editModePostIndex:postIndex,
      editedDescription:description
    });
  }

  cancelEdit = () => {
    this.setState({
      editModePostIndex:undefined,
      editedDescription:""
    });
  }

  savePost = (postId, postIndex) => {
    let editedDescription = this.state.editedDescription;
    return fetch("http://localhost:3001/posts/"+ postId, {
      method: 'PUT',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        description: editedDescription
      })
    }).then(
      ()=> 
      {
        let posts = [ ...this.state.posts ];
        posts[postIndex] = {...posts[postIndex], description: editedDescription};
        this.setState({ posts });
        this.cancelEdit();
      }
    )
  }

  deletePost = (postId, postIndex) => {
    return fetch("http://localhost:3001/posts/"+ postId, {
      method: 'DELETE'
    }).then(
      ()=>{
        this.setState({posts: this.state.posts.filter((postId, index) => index !== postIndex)});
      }
    );
  }

  updateEditedDescription = (event) =>{
    this.setState({
      editedDescription: event.target.value
    });
  }

  showModal = (postIndex) => {
    this.setState({ 
      showPostInModal: true,
      modalModePostIndex: postIndex
    });
  };

  hideModal = () => {
    this.setState({ 
      showPostInModal: false,
      modalModePostIndex: undefined
     });
     this.cancelEdit();
  };

  showPreviousPost = () => {
    let postIndex = this.state.modalModePostIndex;
    this.setState({ 
      modalModePostIndex: postIndex === 0 ? this.state.posts.length-1 : --postIndex
    });
  };

  showNextPost = () => {
    let postIndex = this.state.modalModePostIndex;
    this.setState({ 
      modalModePostIndex: postIndex === this.state.posts.length-1 ? 0 : ++postIndex
    });
  };

  renderDefaultButtons = (postId, postIndex) => {
    return (
    <div>
       <button key="save_button" type="button" onClick= {(event)=>{event.stopPropagation(); this.savePost(postId, postIndex)}}>Save</button>
       <br></br>
       <button key="cancel_button" type="button" onClick= {(event)=>{event.stopPropagation(); this.cancelEdit()}}>Cancel</button>
    </div>);
  }
  
  renderEditModeButtons = (postIndex, postDescription) => {
    return (
    <div>  
      <button key="edit_button" type="button" onClick= {(event)=>{event.stopPropagation(); this.editPost(postDescription, postIndex)}}>Edit</button>
    </div>);
  }

  renderPostInModalMode = () => {
    let postIndex = this.state.modalModePostIndex;
    let post = this.state.posts[postIndex];
    return (
    <ModalPost
        handleClose={this.hideModal}
        imageUrl={post.data.media[0].image}
        description={post.description}
        isInEditMode={this.state.editModePostIndex !== undefined}
        editPost={()=>{this.editPost(post.description, postIndex)}}
        deletePost={()=>{this.deletePost(post.id, postIndex)}}
        editedDescription={this.state.editedDescription}
        updateDescription={this.updateEditedDescription} 
        cancelEdit={this.cancelEdit}
        savePost={()=>{this.savePost(post.id, postIndex)}}
        showPreviousPost={this.showPreviousPost} showNextPost={this.showNextPost}>
    </ModalPost>);
  };

  render() {
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
              {this.state.posts.map((post, index)=>(
              <tr onClick={() => this.showModal(index)} key={index.toString()}>
                  <th>
                    {index === this.state.editModePostIndex && this.renderDefaultButtons(post.id, index)}    
                    {(this.state.editModePostIndex === undefined 
                    || index !== this.state.editModePostIndex)
                    && this.renderEditModeButtons(index, post.description)}
                      <button key="delete_button" type="button" 
                      onClick={(event)=>{event.stopPropagation(); this.deletePost(post.id, index)}}>Delete</button>
                  </th>
                    <td key="date">
                      {post.data.media[0].version}
                    </td>
                    {index !== this.state.editModePostIndex 
                    && <td key="description">
                      {post.description}
                    </td>}
                    {index === this.state.editModePostIndex && !this.state.showPostInModal 
                    && <td key="post_in_edit_mode">
                      <input value={this.state.editedDescription} onChange={this.updateEditedDescription}/> 
                    </td>}
                    <td key="image">
                      <img src={post.data.media[0].image} alt="new"/>
                    </td> 
                </tr>
              ))}
          </tbody>
        </table>
        {this.state.showPostInModal && this.renderPostInModalMode()}
      </div>
    );
  }
}

export default ImpacterProfile;
