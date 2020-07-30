---
title: "Cart"
---

When you want to add a product to a cart, you'll need at least the Chec product ID for your product (e.g. `prod_05389st98t49h`). In the previous example we looked at how to retrieve the cart and bind it into an example React component to render your cart, so let's look at how to add new products to your cart!

The product ID you'll need is part of the response object returned from `commerce.products.list()`. When you add a product to cart, the response you get back contains the updated cart object, and each product in the cart has been assigned a "line item ID". Let's look at an example, assuming your product data has the following (abbreviated) content:
```js
{
  id: 'prod_QG375vVPR5rMOg',
  name: 'New season T-shirt',
  variants: [
    {
      id: 'vrnt_RyWOwmPO9lnEa2',
      name: 'Color',
      options: [
        {
          id: 'optn_Op1YoV1jgwXLv9',
          name: 'Red',
        },
        {
          id: 'optn_4WJvlKA8eobYV1',
          name: 'Blue',
        },
        {
          id: 'optn_zkK6oLpvEoXn0Q',
          name: 'Green',
        },
      ]
    }
  ]
}
```
To add the "New season T-shirt" to your cart with the variant "Color" set to variant option "Green", we could use the following code:

```js
import Commerce from '@chec/commerce.js';

const commerce = new Commerce('your_public_key');

// When you click an "Add to cart" button, this would be your click handler logic:
commerce.cart.add(
  'prod_QG375vVPR5rMOg',
  // optional: the number of items to add
  1,
  // optional: if your product has variants, the variant and option ID to add
  { vrnt_RyWOwmPO9lnEa2: 'optn_zkK6oLpvEoXn0Q' }
)
  // Your callback for a successful response
  .then(response => {
    // Have a look at what you get in the response
    console.log(response);
    // Show a message like "Successfully added to cart"?
    this.handleAddedToCart(response);
    // Update the cart in your state (see previous example for context)
    this.setState({ cart: response.cart });
  })
  // You may want to handle any errors here
  .catch(error => console.error('Failed to add to cart!', error));
```

As with all calls using the Commerce.js SDK, the responses are returned asynchronously in a Promise. See ["Getting started"](/docs/overview/getting-started) for more information.

With a freshly updated cart containing your new green New season T-shirt in it, you're ready to update your UI to indicate that the request was successful, and maybe show that checkout button! If your app renders using state management (e.g. React or Vue.js) then simply update the `cart` object in your state, and your cart will automatically update for you.

Here's a few other examples of features you can now add to your cart with their matching Commerce.js SDK methods:

* Remove from cart: `commerce.cart.remove(lineItemId)`
* Clear the cart: `commerce.cart.empty()`
* Update item quantity: `commerce.cart.update(lineItemId, { quantity: 15 })`

Check out the list of features on the [Getting started](/docs/overview/getting-started) page.
