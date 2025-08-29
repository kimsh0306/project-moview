import React, { memo, useContext } from "react";
import CustomPaginate from "common/CustomPaginate/CustomPaginate";
import { MovieFilterContext } from "context/MovieFilterContext";
import { Col, Row } from "react-bootstrap";

const Paginator = ({ data }) => {
  const { filterState, dispatch } = useContext(MovieFilterContext);
  const { page } = filterState;

  const handlePageChange = ({ selected }) => {
    const selectedPage = selected + 1;
    dispatch({ type: "SET_PAGE", payload: { selectedPage: selectedPage } });
  };

  return (
    <section className="paginator">
      <Row className="mt-5">
        <Col xs="12">
          <CustomPaginate
            onPageChange={handlePageChange}
            pageCount={data.total_pages ? Math.ceil(data.total_pages) : 1}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </section>
  );
};

export default memo(Paginator);
