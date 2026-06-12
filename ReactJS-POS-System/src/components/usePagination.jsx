import {useState, useMemo} from 'react';

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(0);
    const paginatedData = useMemo(() => {
        const start = currentPage * itemsPerPage;
        return data.slice(start, start+itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const goToPage = (pageNumber) => {
        setCurrentPage(Math.min(Math.max(0, pageNumber),totalPages - 1));
    };

    return { paginatedData, currentPage, totalPages, goToPage};
};

export default usePagination;