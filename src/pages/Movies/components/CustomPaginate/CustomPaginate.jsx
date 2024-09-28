import React from "react";
import ReactPaginate from "react-paginate";
import "./CustomPaginate.style.css";

const CustomPaginate = ({ appliedData, page, setPage }) => {
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <ReactPaginate
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={
        appliedData?.total_pages ? Math.ceil(appliedData.total_pages) : 1
      }
      previousLabel="<"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      activeLinkClassName="page-link_active"
      renderOnZeroPageCount={null}
      forcePage={page - 1}
      pageClassName={"page-item"}
    />
  );
};

export default CustomPaginate;
