import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Readonly<PaginationProps>) => {
  const maxPagesToShow = 5
  const pages: (number | string)[] = []

  const addPageRange = (start: number, end: number) => {
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }

  if (totalPages <= maxPagesToShow) {
    addPageRange(1, totalPages)
  } else {
    const leftLimit = Math.max(2, currentPage - 1)
    const rightLimit = Math.min(totalPages - 1, currentPage + 1)

    pages.push(1)

    if (leftLimit > 2) pages.push('...')

    addPageRange(Math.max(2, leftLimit), Math.min(rightLimit, totalPages - 1))

    if (rightLimit < totalPages - 1) pages.push('...')
    
    pages.push(totalPages)
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      {pages.map((page, index) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            {page}
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  )
}

export default Pagination;