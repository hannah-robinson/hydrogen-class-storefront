import {
  ProductOptionsProvider,
  useProductOptions,
  Image,
  ProductPrice,
  AddToCartButton,
  // AddToCart,
} from '@shopify/hydrogen'

// ProductOptionsProvider helps with variant switching etc

// to find data structure, logs to browser, not terminal because this is a client side component
export default function ProductDetails({ product }) {
  // console.log(product)
  return (
    <ProductOptionsProvider data={product}>
      <div className='product-page container'>
        <Image
          data={product.media.nodes[0].image}
          className='product-page-image'
        />
        <ProductForm product={product} />
      </div>
    </ProductOptionsProvider>
  )
}

function ProductForm({ product }) {
  const { options, selectedVariant, selectedOptions, setSelectedOption } =
    useProductOptions()
  // useProductOptions is a state object, selectedVariant.id in the Price componentt below will update as we change our selection. Powerful hook. setSelectedOption is a method we can call onChange

  // const isDiscounted = compareAtPrice?.amount > price?.amount
  const isOutOfStock = !selectedVariant?.availableForSale || false
  return (
    <div>
      <h1>{product.title}</h1>
      <ProductPrice
        className='product-page-price'
        withoutTrailingZeros
        data={product}
        variantId={selectedVariant.id}
      />
      {/* {isDiscounted && (
        <ProductPrice
          className='product-compare-at-price'
          withoutTrailingZeros
          data={product}
          variantId={selectedVariant.id}
        />
      )} */}
      <div className='product-options'>
        {options.map(({ name, values }) => {
          if (values.length === 1) {
            return null
          }
          return (
            <div key={name} className='product-option-group'>
              <legend className='product-option-name'>{name}</legend>
              {values.map((value) => {
                const id = `option-${name}-${value}`
                const checked = selectedOptions[name] === value
                return (
                  <div key={id} className='product-option-value'>
                    <input
                      type='radio'
                      checked={checked}
                      name={name}
                      value={value}
                      id={id}
                      onChange={() => setSelectedOption(name, value)}
                    />
                    <label htmlFor={id}>{value}</label>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <AddToCartButton disabled={isOutOfStock} className='add-to-cart'>
        {isOutOfStock ? 'Out of Stock' : 'ADD TO CART'}
      </AddToCartButton>
      <div
        className='product-description'
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      ></div>
      {/* Instructor says we can't just add the {product.descriptionHtml} between the divs because all the html formatting shows (as text). The ' dangerouslySetInnerHTML' name is an infosec reminder about HTTML injection. If we (or admins) add broken HTML to Shopify this section could break.  */}
    </div>
  )
}
// selectedVariant.id is important because price could change depending on selected variant
