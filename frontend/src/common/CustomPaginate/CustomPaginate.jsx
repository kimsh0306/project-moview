import React from "react";
import ReactPaginate from "react-paginate";
import "./CustomPaginate.css";

const CustomPaginate = ({ onPageChange, pageCount, forcePage }) => {
  return (
    <div className="custom-paginate">
      <ReactPaginate
        onPageChange={onPageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        renderOnZeroPageCount={null}
        forcePage={forcePage}
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
    </div>
  );
};

export default CustomPaginate;
