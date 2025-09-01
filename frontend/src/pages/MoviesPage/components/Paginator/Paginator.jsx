import React from "react";
import { useMoviePageFilter } from "hooks/filter";
import CustomPaginate from "common/CustomPaginate/CustomPaginate";
import { Col, Row } from "react-bootstrap";

const Paginator = ({ data }) => {
  console.log('🔥 Paginator 컴포넌트 리렌더링!');
  const [page, setPage] = useMoviePageFilter();

  const handlePageChange = ({ selected }) => {
    const selectedPage = selected + 1;
    setPage(selectedPage)
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

export default Paginator;
