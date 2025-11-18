import React from "react";
import { ArrowLeftOutline, ArrowRightOutline } from "solar-icon-set";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (currentPage: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex  justify-between items-center">
      <span className="text-gray-600">{totalItems} items</span>
      <div className="flex items-center mt-2">
        <button
          className={`bg-white flex h-8 items-center gap-1 shadow-[0px_1px_2px_0px_rgba(42,59,81,0.12),0px_0px_0px_1px_rgba(18,55,105,0.08)] px-3.5 py-1.5 rounded-lg  ${
            currentPage === 1 ? "cursor-not-allowed" : " cursor-pointer"
          }`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          {currentPage === 1 ? <ArrowLeftOutline color="rgba(13, 13, 13, 0.4)" /> : <ArrowLeftOutline />}
        </button>
        <span className="px-4">{currentPage}</span>
        <button
          className={`bg-white flex h-8 items-center gap-1 shadow-[0px_1px_2px_0px_rgba(42,59,81,0.12),0px_0px_0px_1px_rgba(18,55,105,0.08)] px-3.5 py-1.5 rounded-lg ${
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          {currentPage === totalPages ? <ArrowRightOutline color="rgba(13, 13, 13, 0.4)" /> : <ArrowRightOutline />}
        </button>

        <span className="text-gray-400 ml-2">of {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
