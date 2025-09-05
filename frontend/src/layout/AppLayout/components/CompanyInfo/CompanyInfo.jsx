import React from "react";
import "./CompanyInfo.style.css";

const CompanyInfo = () => {
  return (
    <div className="company-info">
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
    </div>
  );
};

export default CompanyInfo;
