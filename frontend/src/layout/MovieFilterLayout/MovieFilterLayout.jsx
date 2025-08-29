import React from "react";
import CustomContainer from "common/CustomContainer/CustomContainer";
import SortSelector from "./components/SortSelector/SortSelector";
import GenreSelector from "./components/GenreSelector/GenreSelector";
import MoviesViewer from "./components/MoviesViewer/MoviesViewer";
import Paginator from "./components/Paginator/Paginator";

const MovieFilterLayout = ({ domain, pageTitle, data }) => {
  return (
    <main className={domain}>
      <CustomContainer>
        <SortSelector pageTitle={pageTitle} />
        <GenreSelector />
        <MoviesViewer data={data} />
        <Paginator data={data} />
      </CustomContainer>
    </main>
  );
};

export default MovieFilterLayout;
