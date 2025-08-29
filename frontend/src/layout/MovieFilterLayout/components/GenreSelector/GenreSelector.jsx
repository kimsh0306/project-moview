import React, { memo, useContext } from "react";
import { MovieFilterContext } from "context/MovieFilterContext";
import { useMovieGenreQuery } from "hooks/useMovieGenre";
import { Button, Row, Col } from "react-bootstrap";
import "./GenreSelector.css";

const GenreSelector = () => {
  const { filterState, dispatch } = useContext(MovieFilterContext);
  const { genreIds } = filterState;

  // 전체 장르 데이터
  const { data: genreList } = useMovieGenreQuery();

  const handleGenreClick = (event) => {
    const selectedGenreId = event.target.value;
    dispatch({
      type: "SET_GENRE",
      payload: { selectedGenreId: selectedGenreId },
    });
  };

  return (
    <section className="genre-selector">
      <Row className="mb-5">
        <Col xs="12">
          <div className="genre-btns-box">
            {genreList?.map((genre) => (
              <div className="btn-wrapper" key={genre.id}>
                <Button
                  variant={
                    genreIds.includes(genre.id.toString())
                      ? "primary"
                      : "outline-secondary"
                  }
                  onClick={handleGenreClick}
                  value={genre.id}
                  name={genre.name}
                >
                  {genre.name}
                </Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default memo(GenreSelector);
