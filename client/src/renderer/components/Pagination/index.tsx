import './Pagination.scss'

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}



export const Pagination = (Props: PaginationProps) => {


    const totalPages = Props.totalPages;
    const currentPage = Props.currentPage;

    const { onPageChange: onPageChange } = Props;


    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);



    //
    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        // Nếu đang ở trang cuối cùng, chuyển về trang đầu tiên
        onPageChange(nextPage > totalPages ? 1 : nextPage);
    };
    const handlePreviousClick = () => {

        const PreviousPage = currentPage - 1;
        // Nếu đang ở trang cuối cùng, chuyển về trang đầu tiên
        onPageChange(PreviousPage < totalPages ? 1 : PreviousPage);
    };


    console.log("totalPages", totalPages);
    console.log("currentPage", currentPage);
    console.log("currentPage + 1", currentPage + 1);

    return (
        <ul className='list-page'>
            {totalPages === 1 || currentPage === 1 ? "" : <> <li>
                <a href="#" onClick={() => handlePreviousClick()}>Previous</a>
            </li> </>}

            {pageNumbers.map((pageNumber) => (
                <li key={pageNumber} className={pageNumber === currentPage ? 'active' : ''}>
                    <a href="#" onClick={() => onPageChange(pageNumber)}>
                        {pageNumber}
                    </a>
                </li>
            ))}
            {totalPages === 1 || totalPages === currentPage ? "" : <> <li>
                <a href="#" onClick={() => handleNextClick()}>Next</a>
            </li> </>}

        </ul>
    );
};