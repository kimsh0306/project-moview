import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "hooks/theme/useTheme";
import BSSearchBar from "components/lib/BSSearchBar/BSSearchBar";
import "./SearchBar.style.scss";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!keyword) {
      alert("검색할 영화를 입력해주세요.");
      return;
    }
    navigate(`/search?q=${keyword}`);
    setKeyword("");
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <BSSearchBar
      className="search-bar"
      type="text"
      placeholder="제목"
      aria-label="Search"
      size="sm"
      buttonVal="검색"
      value={keyword}
      onSubmit={handleSubmit}
      onChange={handleChange}
      theme={theme}
    />
  );
};

export default SearchBar;
