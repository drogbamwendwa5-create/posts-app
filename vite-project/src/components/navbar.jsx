import React from "react";

const Navbar = () => {
  return (
    <div>
      <h1>Posts App</h1>
      <nav>
        <ul>
          <li> <a href="/">Home</a> </li>
          <li> <a href="/posts">Posts</a> </li>
          <li> <a href="/postDetails">About</a> </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
