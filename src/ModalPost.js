import React from 'react';
import './ModalPost.css';

const ModalPost = ({handleClose, imageUrl, description, isInEditMode, editPost, editedDescription, updateDescription, cancelEdit, savePost, deletePost, showPreviousPost, showNextPost}) => {
  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <section className="modal-main" onClick={event => { event.stopPropagation()}}>
        <img className="modal-image" src={imageUrl} alt="new" width="50%" height="50%"/>
        {!isInEditMode &&
          <p style={{color: "black"}}>{description}</p>
        }
        {isInEditMode &&
          <input value={editedDescription} onChange={updateDescription} style={{width:"600px", height:"40px"}}/>
        }
        <button type="button" onClick={handleClose}>
          Close
        </button>
        {!isInEditMode && <button type="button" onClick={editPost}>
          Edit
        </button>}
        {isInEditMode && <button type="button" onClick={savePost}>
          Save
        </button>}
        {isInEditMode && <button type="button" onClick={cancelEdit}>
          Cancel
        </button>}
        <button type="button" onClick={deletePost}>
          Delete
        </button>
        <button type="button" onClick={showPreviousPost}>
          Previous
        </button>
        <button type="button" onClick={showNextPost}>
          Next
        </button>
      </section>
    </div>
  );
};

export default ModalPost;