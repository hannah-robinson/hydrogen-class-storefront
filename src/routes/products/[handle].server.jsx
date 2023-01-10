import {
  useShopQuery,
  CacheLong,
  gql,
  useRouteParams,
  Seo,
} from '@shopify/hydrogen'
import { Suspense } from 'react'

import Layout from '../../components/Layout.server'
import ProductDetails from '../../components/ProductDetails.client'
// import ProductCard from '../../components/ProductGridItem.server'

// This is a .server.jsx file because we are querying the server. Whenever we query the server, we should use .server.js (Infosec)

export default function Product() {
  const { handle } = useRouteParams()
  // Because we are using useRouteParams, we need to add a 'variables' property to the useShopQuery's argument object below

  const {
    data: { product: product },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    variables: {
      handle,
    },
  })

  console.log(product)

  return (
    <Layout>
      <Suspense>
        <Seo type='product' data={product} />
        <ProductDetails product={product} />
      </Suspense>
    </Layout>
  )
}

// Best practice to name a query (Here: CollectionDetails). Must specify that we aer goign to pass in a string 'String!' as the handle. Must state either first or last plus a number or you'll get an error.
// Query below gets information about the collection, then details of the first 9 prroducts in the collection (latter bit of querry code is the same as that used on our catalogue route)
const QUERY = gql`
  query Product($handle: String!) {
    product(handle: $handle) {
      title
      descriptionHtml
      media(first: 1) {
        nodes {
          ... on MediaImage {
            id
            image {
              url
              width
              height
              altText
            }
          }
        }
      }
      variants(first: 100) {
        nodes {
          id
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`
