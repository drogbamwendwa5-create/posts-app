import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="page">
      <div className="container">
        <section className="hero">
          <div className="hero__badge">✨ Welcome to PostFlow</div>
          <h1 className="hero__title">
            Discover, Read &<br />
            <span className="hero__title-accent">Explore Posts</span>
          </h1>
          <p className="hero__subtitle">
            A beautifully crafted space to browse and read posts. Dive into
            a world of ideas, stories, and insights — all in one place.
          </p>
          <div className="hero__actions">
            <Link to="/posts" className="btn btn-primary">
              Browse Posts →
            </Link>
            <a
              href="https://jsonplaceholder.typicode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
            </a>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat">
              <div className="stat__number">100</div>
              <div className="stat__label">Posts</div>
            </div>
            <div className="stat">
              <div className="stat__number">500</div>
              <div className="stat__label">Comments</div>
            </div>
            <div className="stat">
              <div className="stat__number">10</div>
              <div className="stat__label">Authors</div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="feature-card">
            <div className="feature-card__icon">🚀</div>
            <h3 className="feature-card__title">Lightning Fast</h3>
            <p className="feature-card__desc">
              Built with React and Vite for blazing fast page loads and
              instant navigation between posts.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🎨</div>
            <h3 className="feature-card__title">Beautiful Design</h3>
            <p className="feature-card__desc">
              A sleek dark-mode interface with smooth animations and
              carefully crafted typography.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">💬</div>
            <h3 className="feature-card__title">Rich Comments</h3>
            <p className="feature-card__desc">
              Each post comes with its own set of comments, making it easy
              to explore community discussions.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
