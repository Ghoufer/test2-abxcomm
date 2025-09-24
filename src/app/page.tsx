'use client'
import styles from "./page.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import fetcher, { Characters } from "./services/fetcher";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import Search from "./components/Search/Search";
import useDebounce from "./hooks/useDebounce";
import Pagination from "./components/Pagination/Pagination";

export default function Home() {
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [characters, setCharacters] = useState<Characters[]>([])

  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLInputElement>(null)

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true)

      const response = await fetcher(`character/?name=${debouncedQuery}&page=${page}`)

      if (response) {
        if (response.results) setCharacters(response.results)
        if (response.info) setTotalPages(response.info.pages)
      } else {
        setCharacters([])
      }
    } catch(err) {
      setCharacters([])
      throw new Error('Não foi possível encontrar a personagem', { cause: err })
    } finally {
      setLoading(false)
    }
  }, [page, debouncedQuery])

  const handleSearch = (searchTerm: string) => {
    setPage(1)
    setQuery(searchTerm)
  }

  useEffect(() => {
    if (searchRef.current) searchRef.current.focus()
  }, [])

  useEffect(() => {
    fetchCharacters()
  }, [fetchCharacters, debouncedQuery])

  return (
    <div className={styles.page}>
      <Search ref={searchRef} handleSearch={handleSearch} />

      {characters.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {loading && (
        <>
          <span className={styles.loader} />
          <span>Carregando...</span>
        </>
      )}

      <main className={styles.main}>
        {characters.length > 0 && characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}

        {characters.length === 0 && query !== '' && (
          <span>Não conseguimos encontrar a personagem que busca</span>
        )}
      </main>
    </div>
  )
}