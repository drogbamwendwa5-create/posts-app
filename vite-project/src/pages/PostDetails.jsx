import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postRes, commentsRes] = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`),
        ]);

        if (!postRes.ok) throw new Error("Post not found");

        const postData = await postRes.json();
        const commentsData = await commentsRes.json();

        setPost(postData);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <div className="container">
          <div className="post-detail">
            <div className="loading">
              <div className="spinner"></div>
              <span className="loading__text">Loading post...</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="container">
          <div className="error-state">
            <div className="error-state__icon">😕</div>
            <h2 className="error-state__title">Post not found</h2>
            <p className="error-state__text">{error}</p>
            <Link to="/posts" className="btn btn-primary">
              ← Back to Posts
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <article className="post-detail">
          <Link to="/posts" className="post-detail__back">
            ← Back to all posts
          </Link>

          <div className="post-detail__meta">
            <span className="post-detail__tag">Post</span>
            <span className="post-detail__id">#{post.id} · User {post.userId}</span>
          </div>

          <h1 className="post-detail__title">{post.title}</h1>

          <div className="post-detail__body">
            <p>{post.body}</p>
          </div>

          {/* Comments */}
          <section className="comments">
            <h2 className="comments__title">
              Comments
              <span className="comments__count">{comments.length}</span>
            </h2>
            {comments.map((comment) => (
              <div className="comment" key={comment.id}>
                <div className="comment__header">
                  <div className="comment__avatar">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="comment__name">{comment.name}</div>
                    <div className="comment__email">{comment.email}</div>
                  </div>
                </div>
                <p className="comment__body">{comment.body}</p>
              </div>
            ))}
          </section>
        </article>
      </div>
    </main>
  );
};

export default PostDetails;
