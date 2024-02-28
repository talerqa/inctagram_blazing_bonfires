import querystring, { ParsedUrlQuery } from 'querystring'

import { useEffect, useState } from 'react'

export const useGetQueryParams = () => {
  const [query, setQuery] = useState<Record<string, string | string[] | undefined>>({})

  useEffect(() => {
    const url = window.location.href

    const parsedParams: ParsedUrlQuery = querystring.parse(url.split('?')[1])

    setQuery({ ...parsedParams })
  }, [])

  return { query }
}
