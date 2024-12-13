import React from 'react';
import './Pagination.scss';

type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    /** Обработчик перехода на следующую страницу */
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    /** Обработчик перехода на предыдущую страницу */
    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    /** Обработчик выбора страницы */
    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    /** Расчет и рендер пагинации */
    const renderPageNumbers = () => {
        const visiblePages = 3; // Количество центральных страниц
        const pageNumbers: React.ReactNode[] = [];

        if (totalPages <= visiblePages + 4) {
            // Если страниц мало, отображаем все
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`pagination__page ${currentPage === i ? 'active' : ''}`}
                        onClick={() => handlePageClick(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            // Отображаем начало, конец и центральные страницы
            const startPages = [1, 2];
            const endPages = [totalPages - 1, totalPages];
            const middlePages = [];

            let start = Math.max(3, currentPage - Math.floor(visiblePages / 2));
            let end = Math.min(totalPages - 2, currentPage + Math.floor(visiblePages / 2));

            if (start > 3) {
                middlePages.push(<span key="start-ellipsis">...</span>);
            }

            for (let i = start; i <= end; i++) {
                middlePages.push(
                    <button
                        key={i}
                        className={`pagination__page ${currentPage === i ? 'active' : ''}`}
                        onClick={() => handlePageClick(i)}
                    >
                        {i}
                    </button>
                );
            }

            if (end < totalPages - 2) {
                middlePages.push(<span key="end-ellipsis">...</span>);
            }

            pageNumbers.push(
                ...startPages.map((page) => (
                    <button
                        key={page}
                        className={`pagination__page ${currentPage === page ? 'active' : ''}`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                )),
                ...middlePages,
                ...endPages.map((page) => (
                    <button
                        key={page}
                        className={`pagination__page ${currentPage === page ? 'active' : ''}`}
                        onClick={() => handlePageClick(page)}
                    >
                        {page}
                    </button>
                ))
            );
        }

        return pageNumbers;
    };

    return (
        <div className="pagination">
            <button
                className="pagination__button"
                onClick={handlePrev}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            <div className="pagination__pages">{renderPageNumbers()}</div>
            <button
                className="pagination__button"
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;