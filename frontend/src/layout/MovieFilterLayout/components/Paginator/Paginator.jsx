import React, { memo, useContext } from "react";
import CustomPaginate from "common/CustomPaginate/CustomPaginate";
import SectionWrapper from "../SectionWrapper";
import { MovieFilterContext } from "context/MovieFilterContext";

const Paginator = ({ data }) => {
  const { filterState, dispatch } = useContext(MovieFilterContext);
  const { page } = filterState;

  const handlePageChange = ({ selected }) => {
    const selectedPage = selected + 1;
    dispatch({ type: "SET_PAGE", payload: { selectedPage: selectedPage } });
  };

  return (
    <SectionWrapper
      sectionProps={{ className: "paginator" }}
      rowProps={{ className: "mt-5" }}
      colProps={{ xs: "12" }}
    >
      <CustomPaginate
        onPageChange={handlePageChange}
        pageCount={data.total_pages ? Math.ceil(data.total_pages) : 1}
        forcePage={page - 1}
      />
    </SectionWrapper>
  );
};

export default memo(Paginator);
