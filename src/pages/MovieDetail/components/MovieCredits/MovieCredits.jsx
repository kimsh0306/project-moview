import React, { useEffect, useState } from "react";
import { useMovieCreditsQuery } from "../../../../hooks/useMovieDetail";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./MovieCredits.style.css";

const itemsToShow = 12;

const MovieCredits = ({ id }) => {
  const [peopleList, setPeopleList] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, isError, error } = useMovieCreditsQuery(id);
  // console.log("dataCredits: ", data);

  const renderCard = (item, idx) => (
    <Card key={`${item.name}-${idx}`} style={{ width: "6rem" }}>
      <Card.Img
        variant="top"
        src={`https://media.themoviedb.org/t/p/w276_and_h350_face${item.profile_path}`}
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>{item.job === "Director" ? "감독" : "배우"}</Card.Text>
      </Card.Body>
    </Card>
  );

  useEffect(() => {
    if (data) {
      const directorList = data?.crew.filter(
        (itemObj) =>
          itemObj.profile_path !== null &&
          itemObj.department === "Directing" &&
          itemObj.job === "Director"
      );
      const actorList = data?.cast.filter(
        (itemObj) => itemObj.profile_path !== null
      );
      setPeopleList([...directorList, ...actorList]);
    }
  }, [data]);

  return (
    <div className="credits-comp">
      <div className="people-box">
        {peopleList
          .filter((_, idx) => isExpanded || idx < itemsToShow)
          .map((item, idx) => renderCard(item, idx))}
        <div className="more-btn">
          {!isExpanded && peopleList.length > itemsToShow && (
            <Button variant="link" onClick={() => setIsExpanded(true)}>
              더보기
            </Button>
          )}
          {isExpanded && (
            <Button variant="link" onClick={() => setIsExpanded(false)}>
              줄이기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCredits;
