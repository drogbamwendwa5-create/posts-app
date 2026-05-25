import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const POSTS_PER_PAGE = 20;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const requestedPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage =
    Number.isNaN(requestedPage) || requestedPage < 1
      ? 1
      : Math.min(requestedPage, totalPages);

  useEffect(() => {
    if (requestedPage !== currentPage) {
      setSearchParams({ page: String(currentPage) });
    }
  }, [requestedPage, currentPage, setSearchParams]);

  const firstPostIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(
    firstPostIndex,
    firstPostIndex + POSTS_PER_PAGE
  );

  if (loading) {
    return (
      <main className="page">
        <div className="container">
          <div className="posts-header">
            <h1 className="posts-header__title">Posts</h1>
            <p className="posts-header__count">Loading...</p>
          </div>
          <div className="skeleton-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-line skeleton-line--sm"></div>
                <div className="skeleton-line skeleton-line--lg"></div>
                <div className="skeleton-line skeleton-line--md"></div>
                <div className="skeleton-line skeleton-line--md"></div>
              </div>
            ))}
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
            <div className="error-state__icon">⚠️</div>
            <h2 className="error-state__title">Something went wrong</h2>
            <p className="error-state__text">{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">
        <div className="posts-header">
          <h1 className="posts-header__title">All Posts</h1>
          <p className="posts-header__count">
            Showing {currentPosts.length} of {posts.length} posts
          </p>
        </div>
        <div className="posts-grid">
          {currentPosts.map((post, index) => (
            <Link
              to={`/posts/${post.id}`}
              className="post-card"
              key={post.id}
              style={{ animationDelay: `${(index % 12) * 0.05}s` }}
            >
              <span className="post-card__number">Post #{post.id}</span>
              <h2 className="post-card__title">{post.title}</h2>
              <p className="post-card__body">{post.body}</p>
              <div className="post-card__footer">
                <div className="post-card__user">
                  <div className="post-card__avatar">U{post.userId}</div>
                  <span className="post-card__username">User {post.userId}</span>
                </div>
                <span className="post-card__arrow">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination">
          <button
            className="pagination__button"
            disabled={currentPage === 1}
            onClick={() => setSearchParams({ page: String(currentPage - 1) })}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`pagination__button ${
                  page === currentPage ? "pagination__button--active" : ""
                }`}
                onClick={() => setSearchParams({ page: String(page) })}
              >
                {page}
              </button>
            );
          })}

          <button
            className="pagination__button"
            disabled={currentPage === totalPages}
            onClick={() => setSearchParams({ page: String(currentPage + 1) })}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default Posts;