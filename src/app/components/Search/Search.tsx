
import { forwardRef } from 'react';
import styles from './Search.module.css'

interface Props {
  handleSearch: (searchTerm: string) => void
}

const Search = forwardRef<HTMLInputElement, Props>(({ handleSearch }, ref) => {
  return (
    <div>
      <input
        ref={ref}
        type='text'
        className={styles.search}
        placeholder='Digite o nome do personagem que procura...'
        onChange={(query) => handleSearch(query.target.value)}
      />
    </div>
  )
})

Search.displayName = "Search"

export default Search;