// Home.js
import { SlLike } from "react-icons/sl";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css"; // Import the CSS file

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    axios
      .get("https://backend-socialapp-ylcj.onrender.com/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleLike = (postId) => {
    axios
      .post(
        `https://backend-socialapp-ylcj.onrender.com/api/posts/like/${postId}`
      )
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error("Error liking post:", error));
  };

  const handleAddComment = (postId, commentText) => {
    axios
      .post(
        `https://backend-socialapp-ylcj.onrender.com/api/posts/comment/${postId}`,
        {
          text: commentText,
        }
      )
      .then((response) => {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? response.data : post
        );
        setPosts(updatedPosts);
        setCommentInputs((prev) => ({ ...prev, [postId]: "" })); // Clear input field after comment
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  return (
    <div className="container">
      <h2 className="title">Recent Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.file && (
            <div className="media-container">
              {post.file.endsWith(".mp4") ? (
                <video width="320" height="240" controls>
                  <source
                    src={`https://backend-socialapp-ylcj.onrender.com/uploads/${post.file}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={`https://backend-socialapp-ylcj.onrender.com/uploads/${post.file}`}
                  alt="Post Media"
                  onError={(e) => {
                    console.error("Error loading image:", e.target.src);
                  }}
                />
              )}
            </div>
          )}
          <div className="like-comment-container">
            <p className="likes">
              <SlLike /> {post.likes}
            </p>
            <button
              onClick={() => handleLike(post._id)}
              className="like-button"
            >
              Like
            </button>
          </div>
          <div className="comments-container">
            <p>Comments: {post.comments.length}</p>
            <ul>
              {post.comments.map((comment, index) => (
                <li key={index}>{comment.text}</li>
              ))}
            </ul>
            <div className="comment-input-container">
              <input
                type="text"
                placeholder="Add a comment"
                className="comment-input"
                value={commentInputs[post._id] || ""}
                onChange={(e) =>
                  handleCommentInputChange(post._id, e.target.value)
                }
              />
              <button
                onClick={() =>
                  handleAddComment(post._id, commentInputs[post._id] || "")
                }
                className="comment-button"
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
