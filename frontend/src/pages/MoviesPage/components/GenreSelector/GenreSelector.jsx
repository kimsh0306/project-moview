import React from "react";
import { useMovieGenreQuery } from "hooks/useMovieGenre";
import { useMovieGenreFilter } from "hooks/filter";
import { Button, Row, Col } from "react-bootstrap";
import "./GenreSelector.css";

// 개별 장르 버튼 컴포넌트
const GenreButton = ({ genre, isSelected, onClick }) => {
  return (
    <div className="btn-wrapper">
      <Button
        variant={isSelected ? "primary" : "outline-secondary"}
        onClick={onClick}
        value={genre.id}
        name={genre.name}
      >
        {genre.name}
      </Button>
    </div>
  );
};

const GenreSelector = () => {
  const [genreIds, setGenreIds] = useMovieGenreFilter();

  // 전체 장르 데이터
  const { data: genreList } = useMovieGenreQuery();

  const handleGenreClick = (event) => {
    const selectedGenreId = event.target.value;
    setGenreIds(selectedGenreId);
  };

  return (
    <section className="genre-selector">
      <Row className="mb-5">
        <Col xs="12">
          <div className="genre-btns-box">
            {genreList?.map((genre) => (
              <GenreButton
                key={genre.id}
                genre={genre}
                isSelected={genreIds.includes(genre.id.toString())}
                onClick={handleGenreClick}
              />
            ))}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default GenreSelector;
