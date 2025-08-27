import React from "react";
import { Alert } from "react-bootstrap";
import useBannerData from "../../hooks/useBannerData";
import LoadingModal from "common/LoadingModal/LoadingModal";
import CustomCarousel from "common/CustomCarousel/CustomCarousel";
import BannerMovie from "./BannerMovie";
import "./Banner.css";

const Banner = () => {
  const { bannerData, isLoading, isError, error } = useBannerData();

  if (isLoading) return <LoadingModal show={true} />;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;
  if (!bannerData) return <Alert variant="danger">No data available</Alert>;

  return (
    <section className="banner">
      <CustomCarousel
        items={bannerData}
        ItemComponent={BannerMovie}
      />
    </section>
  );
};

export default Banner;
