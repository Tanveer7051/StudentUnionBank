import React from "react";
import { useParams, Link } from "react-router-dom";
import posts from "./PostData";

function SinglePost() {
    const { id } = useParams();
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="singlePostContainer">
  <Link style={{ marginLeft: "1rem",fontSize:"20px", textDecoration:"none" }} to="/blog" className="btn btn-link mb-3">← Back to Blog</Link>

  <div className="row">
    <div className="col-12 text-center">
      <img
        src={`/${post.image}`}
        alt={post.title}
        className="img-fluid my-4"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
    </div>
  </div>

  <div className="row">
    <div className="col-12 single-post">
      <h1>{post.title}</h1>
      <div>{post.details}</div>  {/* Render JSX content directly */}
    </div>
  </div>
</div>

    );
}

export default SinglePost;
