import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, arrOfCurrButtons, prevPageClick, nextPageClick, setCurrentPage }) => {
  return (
    <div className="table-filter-info">
      <div className="dt-pagination">
        <ul className="dt-pagination-ul">
            
          {currentPage > 1 && (
            <li className="dt-item">
              <Link to={`/blogs/${currentPage - 1}`} className="dt-link" onClick={prevPageClick}>Prev</Link>
            </li>
          )}

          {arrOfCurrButtons.map((data, index) => (
            <li key={index} className={`dt-item ${currentPage === data ? "active" : ""}`}>
              <Link to={`/blogs/${data}`} className="dt-link" onClick={() => setCurrentPage(data)}>{data}</Link>
            </li>
          ))}

          {currentPage < totalPages && (
            <li className="dt-item">
              <Link to={`/blogs/${currentPage + 1}`} className="dt-link" onClick={nextPageClick}>Next</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
