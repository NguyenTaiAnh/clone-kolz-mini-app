import { useMemo } from 'react'
import useCombinedQueries from './queries/useCombinedQueries'

const useConfig = (token: string | null) => {
  const results = useCombinedQueries(token)
  const isFetching = useMemo(() => results.some((result) => result.isFetching), [results])
  return { isFetching }
}

export default useConfig
