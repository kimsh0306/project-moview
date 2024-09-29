import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import "./MovieGenre.style.css";

const MovieGenre = ({ originalData, setAppliedData, genreList }) => {
  // const [selectedGenre, setSelectedGenre] = React.useState("");
  const [selectedGenreIds, setSelectedGenreIds] = React.useState([]);

  const handleGenreClick = (event) => {
    const genreId = event.target.value;
    if (!selectedGenreIds.includes(genreId)) {
      setSelectedGenreIds((prevState) => [...prevState, genreId]);
    } else {
      setSelectedGenreIds((prevState) =>
        prevState.filter((item) => item !== genreId)
      );
    }
  };

  useEffect(() => {
    if (selectedGenreIds.length > 0) {
      let result = [];
  
      selectedGenreIds.forEach((item) => {
        const filteredResults = originalData.results.filter((obj) =>
          obj.genre_ids.includes(Number(item))
        );
        
        filteredResults.forEach((movie) => {
          // 이미 result에 포함되지 않은 경우에만 추가
          if (!result.some((res) => res.id === movie.id)) {
            result = [...result, movie];
          }
        });
      });
  
      setAppliedData((prevState) => {
        return { ...prevState, results: result };
      });
    } else {
      setAppliedData(originalData);
    }
  }, [selectedGenreIds]);

  return (
    <>
      {genreList.map((item, idx) => {
        return (
          <Button
            key={`${item}-${idx}`}
            className="badge"
            variant={
              selectedGenreIds.includes(item.id.toString())
                ? "primary"
                : "secondary"
            }
            onClick={handleGenreClick}
            value={item.id}
            name={item.name}
          >
            {item.name}
          </Button>
        );
      })}
    </>
  );
};

export default MovieGenre;
