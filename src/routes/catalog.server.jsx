import { useShopQuery, CacheLong, gql } from '@shopify/hydrogen'
import { Suspense } from 'react'
import Layout from '../components/Layout.server'

// This is a .server.jsx file because we are querying the server. Whenever we query the server, we should use .server.js(Infosec)

export default function Catalog() {
  const data = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: true,
  })

  const {
    data: {
      products: { nodes },
    },
  } = data

  // console.log(nodes)

  return (
    <Layout>
      <Suspense>
        <div className='catalog-page container'>
          <div className='product-grid'>
            <ul>
              {nodes.map((product) => (
                <li>{product.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </Suspense>
    </Layout>
  )
}

// Best practice too name a query (Here: query products). Must state either first or last plus a number or you'll get an error.
const QUERY = gql`
  query products {
    products(first: 9) {
      nodes {
        title
        handle
      }
    }
  }
`
