import React from 'react';
import styles from "./Pagination.module.scss";

const Pagination = ({countInfoInPage, totalCount, paginateFun, currentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCount / countInfoInPage); i++) {
        pageNumbers.push(i)
    }

    const nextPage = () => {
        if ( currentPage < pageNumbers.length) {
            paginateFun(currentPage + 1);
        }
    }

    const prevPage = () => {
        if (currentPage !== 1) {
            paginateFun(currentPage - 1);
        }
    }


    return (
        <div className={styles.root}>
            <button className={styles.button} onClick={prevPage}>⮜</button>
            {pageNumbers.map((number, index) => (
                <button className={styles.button} key={index} onClick={() => paginateFun(number)}>{number}</button>
            ))}
            <button className={styles.button} onClick={nextPage}>⮞</button>
        </div>
    );
};

export default Pagination;