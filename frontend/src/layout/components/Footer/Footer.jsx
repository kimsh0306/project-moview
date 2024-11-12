import React from "react";
import "./Footer.style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div style={{ margin: "10px 0" }}>
        <a
          href="https://github.com/kimsh0306/project-moview"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", margin: "0 10px" }}
        >
          GitHub
        </a>
        |
        <a
          href="mailto:b666790@gmail.com"
          style={{ textDecoration: "none", margin: "0 10px" }}
        >
          Contact
        </a>
      </div>
      <div>
        <p>
          &copy; 2024 Moview. All rights reserved.
          <br />
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
