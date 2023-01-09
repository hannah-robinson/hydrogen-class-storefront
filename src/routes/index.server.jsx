import { useShopQuery, CacheLong, gql } from '@shopify/hydrogen'
// CacheLong is a caching strategy utility from H.
// gql is utility to to syyntax highlighting for GraphQL queries.

export default function Home() {
  // get data from Shopify storefront API (We are using dummy data from Shopify. How? See in the hydrigen.confiig.js file "storeDomain: 'hydrogen-preview.myshopify.com")
  // We write our query at the end of this file and use it up here with useShopQuery
  // The cache and preload settings are just default settings from the Shopify tutorial e.g.s
  const data = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: true,
  })

  const {
    data: { shop },
  } = data
  // Destructure data that the useShopQuery gets us from Shopify storefront API

  console.log(data)
  // To see what data we re getting back. Refresh page in browser. Logs to terminal, not browser. This is a serverside component because the file name ends in .server.jsx

  return (
    <div className='home-page container'>
      <h1>{shop.name}</h1>
      <div>{shop.description}</div>
    </div>
  )
}

// We write our query here and use it in the useShopQuery above
const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`
