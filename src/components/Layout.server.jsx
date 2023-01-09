// Here we have our header and SEO information so that they are automatically on every page
import { useShopQuery, CacheLong, gql, Seo, Link } from '@shopify/hydrogen'
import { Suspense } from 'react'
// CacheLong is a caching strategy utility from H.
// gql is utility to to syyntax highlighting for GraphQL queries.
// Seo does ssoome of the SEO for you

export default function Layout({ children }) {
  // Destructure any children that will get passed into the Layout component 👆

  // Get data from Shopify storefront API (We are using dummy data from Shopify. How? See in the hydrigen.confiig.js file "storeDomain: 'hydrogen-preview.myshopify.com")
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

  // console.log(data)
  // To see what data we re getting back. Refresh page in browser. Logs to terminal, not browser. This is a serverside component because the file name ends in .server.jsx

  // Suspense for data fetching tags help handle async. (They are experimental. Read React docs before using in prod.) We are now bringing in any children whether they are loaded async or not. This is now wrapped around every route.
  // Seo is on self-closing tag
  return (
    <>
      <Seo
        type='defaultSeo'
        data={{
          title: shop.name,
          description: shop.description,
        }}
      />
      <header>
        <div className='container header-inner'>
          <Link to='/' className='header-logo'>
            {shop.name}
          </Link>
          <ul className='header-navigation'>
            <li>
              <a href='#'>Link 1</a>
            </li>
            <li>
              <a href='#'>Link 2</a>
            </li>
            <li>
              <a href='#'>Link 3</a>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <Suspense>{children}</Suspense>
      </main>
    </>
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
