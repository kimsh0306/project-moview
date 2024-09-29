import React from "react";
import ReactPaginate from "react-paginate";
import "./CustomPaginate.style.css";

const CustomPaginate = ({ appliedData, page, setPage }) => {
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <ReactPaginate
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={
        appliedData?.total_pages ? Math.ceil(appliedData.total_pages) : 1
      }
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      renderOnZeroPageCount={null}
      forcePage={page - 1}
      containerClassName="pagination"
      pageClassName="page-item"
      previousClassName="page-item prev"
      nextClassName="page-item next"
      breakClassName="page-item break"
      activeClassName="page-item active"
      pageLinkClassName="page-link"
      previousLinkClassName="page-link prev"
      nextLinkClassName="page-link next"
      breakLinkClassName="page-link break"
      activeLinkClassName="page-link active"
    />
  );
};

export default CustomPaginate;
