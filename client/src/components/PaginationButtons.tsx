import React, { useContext } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { PatientsContext } from "../pages/PatientsUI";

const PaginationButtons: React.FC = () => {
  const patientsContext = useContext(PatientsContext);

  if (!patientsContext || !patientsContext.data) {
    return null; // or loading spinner
  }

  const { numOfPages, currentPage } = patientsContext.data;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber.toString());
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }: any) => {
    return (
      <button
        className={`btn join-item ${activeClass ? "btn-primary" : ""}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const addedPages = new Set<number>();

    const tryAddButton = (pageNumber: number, isActive: boolean = false) => {
      if (
        !addedPages.has(pageNumber) &&
        pageNumber >= 1 &&
        pageNumber <= numOfPages
      ) {
        pageButtons.push(addPageButton({ pageNumber, activeClass: isActive }));
        addedPages.add(pageNumber);
      }
    };

    tryAddButton(1, currentPage === 1);

    if (currentPage > 3) {
      pageButtons.push(
        <span className="btn btn-ghost" key="dots-1">
          ...
        </span>
      );
    }

    tryAddButton(currentPage - 1);
    tryAddButton(currentPage, true);
    tryAddButton(currentPage + 1);

    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className="btn btn-ghost" key="dots+1">
          ...
        </span>
      );
    }

    tryAddButton(numOfPages, currentPage === numOfPages);

    return pageButtons;
  };

  return (
    <div className="join absolute bottom-0 right-0">
      <button
        className="join-item btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      {renderPageButtons()}
      <button
        className="join-item btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </div>
  );
};

export default PaginationButtons;
