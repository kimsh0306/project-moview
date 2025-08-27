import React from "react";
import CustomContainer from "common/CustomContainer/CustomContainer";
import SortSelector from "./components/SortSelector/SortSelector";
import GenreSelector from "./components/GenreSelector/GenreSelector";
import MoviesViewer from "./components/MoviesViewer/MoviesViewer";
import Paginator from "./components/Paginator/Paginator";

const MovieFilterLayout = ({ domain, pageTitle, data, noFilter }) => {
  return (
    <main className={domain}>
      <CustomContainer>
        <div className="filter-block">
          <SortSelector pageTitle={pageTitle} noFilter={noFilter} />
          {noFilter || <GenreSelector />}
        </div>
        <div className="viewer-block">
          <MoviesViewer data={data} />
          <Paginator data={data} />
        </div>
      </CustomContainer>
    </main>
  );
};

export default MovieFilterLayout;
