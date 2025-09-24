
const BASE_URL = 'https://rickandmortyapi.com/api/'

export interface CharactersResponse {
  info: {
    count: number
    pages: number
  }
  results: Characters[]
}

export interface Characters {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  image: string
  episode: string[]
  url: string
  created: string
}

const fetcher = async (route: string, options = {}) => {

  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    signal:  new AbortController().signal
  }

  const config = { ...defaultOptions, ...options }

  try {
    const response = await fetch(BASE_URL.concat(route), config)

    if (!response.ok) {
      console.log('Não foi possivel finalizar a request')

      throw new Error('Não foi possivel finalizar a request', { cause: response })
    }

    return await response.json()
  } catch(err: any) {
    if (err.name === "AbortError") {
      throw new Error('A Request foi abortada', { cause: err })
    }
  }
}

export default fetcher