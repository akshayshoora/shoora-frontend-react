import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.css';

const PaginationTest = (props) => {
	var page = 10;

	const { onPageChange, totalPageCount, siblingCount = 1, currentPage, pageSize = page, className } = props;
	var totalCount = totalPageCount * page;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize
	});

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<ul className={classnames('pagination-container justify-content-end', { [className]: className })}>
			<li
				className={classnames('pagination-item', {
					disabled: currentPage === 1
				})}
				onClick={onPrevious}
			>
				<i class="fa fa-angle-left"></i>
			</li>
			{paginationRange.map((pageNumber) => {
				if (pageNumber === DOTS) {
					return <li className="pagination-item dots">&#8230;</li>;
				}

				return (
					<li
						className={classnames('pagination-item', {
							selected: pageNumber === currentPage
						})}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={classnames('pagination-item', {
					disabled: currentPage === lastPage
				})}
				onClick={onNext}
			>
				<i class="fa fa-angle-right"></i>
			</li>
		</ul>
	);
};

export default PaginationTest;
