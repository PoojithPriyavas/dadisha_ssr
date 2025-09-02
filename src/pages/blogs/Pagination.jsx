import React from "react";

const Pagination = ({ currentPage, totalPages, arrOfCurrButtons, prevPageClick, nextPageClick, setCurrentPage }) => {
  return (
    <div className="table-filter-info">
      <div className="dt-pagination">
        <ul className="dt-pagination-ul">
            
          {currentPage > 1 && (
            <li className="dt-item">
              <a className="dt-link" onClick={prevPageClick}>Prev</a>
            </li>
          )}

          {arrOfCurrButtons.map((data, index) => (
            <li key={index} className={`dt-item ${currentPage === data ? "active" : ""}`}>
              <a className="dt-link" onClick={() => setCurrentPage(data)}>{data}</a>
            </li>
          ))}

          {currentPage < totalPages && (
            <li className="dt-item">
              <a className="dt-link" onClick={nextPageClick}>Next</a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
