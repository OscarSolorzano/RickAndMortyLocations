import React from 'react';

const Pagination = ({ residentsPerPage, totalResidents, paginate, currentPage }) => {
    const pageNumbers = [];
    const lastPage = Math.ceil(totalResidents / residentsPerPage)

    for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i)

    }

    const prevPage = () => {
        if (currentPage != 1) {
            paginate(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage != lastPage) {
            paginate(currentPage + 1)
        }
    }

    return (
        <div className='pagination'>
            <a onClick={prevPage}>&#60;</a>
            {pageNumbers.map(number => (
                <a
                    className={currentPage === number && 'active'}
                    onClick={() => paginate(number)} href='#'
                >{number}</a>
            ))}
            <a onClick={nextPage}>&#62;</a>
        </div>
    );
};

export default Pagination;