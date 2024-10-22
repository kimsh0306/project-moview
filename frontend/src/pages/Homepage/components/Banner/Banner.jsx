import React from "react";
import { Alert, Carousel } from "react-bootstrap";
import { usePopularMoviesQuery } from "../../../../hooks/useMovieListsQuerys";
import LoadingModal from "../../../../common/LoadingModal/LoadingModal";
import BannerItems from "./components/BannerItems/BannerItems";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!data) return <Alert variant="danger">No data available</Alert>;

  return (
    <div className="banner">
      <Carousel>
        {data.results.map((movie, idx) => {
          if (idx < 3) {
            return (
              <Carousel.Item key={`${movie.id}-${idx}`}>
                <BannerItems movie={movie} idx={idx} />
              </Carousel.Item>
            );
          }
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
