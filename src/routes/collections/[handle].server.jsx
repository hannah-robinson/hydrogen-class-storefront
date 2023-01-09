import { useShopQuery, CacheLong, gql, useRouteParams } from '@shopify/hydrogen'
import { Suspense } from 'react'
import Layout from '../../components/Layout.server'
import ProductCard from '../../components/ProductGridItem.server'

// This is a .server.jsx file because we are querying the server. Whenever we query the server, we should use .server.js (Infosec)

export default function Collection() {
  const { handle } = useRouteParams()
  // Because we are using useRouteParams, we need to a 'variables' property to the useShopQuery's argument object below

  const data = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: true,
    variables: {
      handle,
    },
  })

  const {
    data: { collection: collection },
  } = data
  const {
    products: { nodes },
  } = collection

  // console.log(nodes)
  return (
    <Layout>
      <Suspense>
        <div className='catalog-page container'>
          <h1>{collection.title}</h1>
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

// Best practice to name a query (Here: CollectionDetails). Must specify that we aer goign to pass in a string 'String!' as the handle. Must state either first or last plus a number or you'll get an error.
// Query below gets information about the collection, then details of the first 9 prroducts in the collection (latter bit of querry code is the same as that used on our catalogue route)
const QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
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
  }
`
