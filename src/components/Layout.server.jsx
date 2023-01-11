// Here we have our header and SEO information so that they are automatically on every page
import { useShopQuery, CacheLong, gql, Seo, Link } from '@shopify/hydrogen'
import { Suspense } from 'react'
// CacheLong is a caching strategy utility from H.
// gql is utility to to syyntax highlighting for GraphQL queries.
// Seo does ssoome of the SEO for you
import CartBubble from './CartBubble.client'
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
              <Link to='/catalog'>Catalog</Link>
            </li>
            <li>
              <Link to='/collections/freestyle'>Freestyle Collection</Link>
            </li>
            <li>
              <Link to='/products/snowboard'>Top Product</Link>
            </li>
            <li>
              <Link to='/blog'>Blog</Link>
            </li>
          </ul>
          <Link to='/cart' className='header-cart-link'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
              />
            </svg>
            <CartBubble />
          </Link>
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
