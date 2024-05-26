// app/providers.tsx
'use client'

import { useEffect, useState } from "react"
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, useLazyQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


export function Providers({ children }: { children: React.ReactNode }) {

  const [mounted, setMounted] = useState(false)

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
  });

//   const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     // return the headers to the context so httpLink can read them
//     const token = localStorage.getItem('accessToken')
//     return {
//       headers: {
//         ...headers,
//         authorization: token ? `Bearer ${token}` : "",
//       }
//     }
//   });

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_BACKEND_URI,
    // link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: 'include'
  });


  useEffect(() => {

    setMounted(true)
  }, [])

  if (mounted) {
    return (
      <>
          <ApolloProvider client={client}>
              {children}
          </ApolloProvider>
      </>
    )
  }
  else {
    return (
      <>
        <ApolloProvider client={client}>
          {children}
        </ApolloProvider>
      </>
    )
  }
}