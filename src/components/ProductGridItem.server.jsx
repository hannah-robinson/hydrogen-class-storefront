import { Image, Money } from '@shopify/hydrogen'
// Image is Shopify H's fabulous responsive image component. You get nuilt in lazy loading and images sizes like you'd get in a trad Shopify theme image snippet
// Money is a component similar to liquid theme price filters

export default function ProductCard({ product }) {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {}

  const isDiscounted = compareAtPrice?.amount > price?.amount

  return (
    <div className='product-grid-item'>
      <div className='image-container'>
        <Image
          alt={product.featuredImage.altText}
          data={product.featuredImage}
        />
      </div>
      <div className='product-grid-item-title'>{product.title}</div>
      <div className='product-grid-prices'>
        <Money data={price} />
        {isDiscounted && <Money data={compareAtPrice} />}
      </div>
    </div>
  )
}
