import { useShopQuery, CacheLong, gql } from '@shopify/hydrogen'
import { Suspense } from 'react'
import Layout from '../components/Layout.server'
import ProductCard from '../components/ProductGridItem.server'

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
            {nodes.map((product) => (
              <ProductCard product={product}></ProductCard>
            ))}
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
        featuredImage {
          url
          altText
          height
          width
        }
        variants(first: 1) {
          nodes {
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`
