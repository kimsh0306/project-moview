import React,{useState} from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBar = ({theme}) => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const handleKeywordSubmit = (event) => {
    event.preventDefault();
    if (!keyword) {
      alert("검색할 영화를 입력해주세요.");
      return;
    }
    navigate(`/search?q=${keyword}`);
    setKeyword("");
  };

  return (
    <Form className="d-flex" onSubmit={handleKeywordSubmit}>
      <Form.Control
        className="me-1"
        type="text"
        placeholder="제목"
        aria-label="Search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        data-bs-theme={theme}
        size="sm"
      />
      <Button type="submit" size="sm">
        검색
      </Button>
    </Form>
  );
};

export default SearchBar;
