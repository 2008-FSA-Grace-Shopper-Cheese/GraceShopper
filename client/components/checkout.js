import React from 'react'
import checkoutCheese from './checkoutCheese'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const cart = [
  {
    name: 'brie',
    price: '30',
    description:
      'Made in Normandy, the home of Camembert, Baby Brie is renowned for its exceptional quality and freshness. This bloomy-rind, creamy cheese packs all of the goodness of French Brie into an 7 ounce wheel. You will love its inviting aroma and palate-pleasing flavor.',
    imageUrl:
      'https://envato-shoebox-0.imgix.net/21e0/6804-b2d3-4a47-bc42-d3293192a889/6DII29-11-2018-013553.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=23237f5ee019eff348a6db271e920d87',
    quantity: 5
  },
  {
    name: 'Camembert',
    price: '15.50',
    description:
      "Camembert is a moist, soft, creamy, surface-ripened cow's milk cheese. It was first made in the late 18th century at Camembert, Normandy, in northern France. It is similar to Brie, which is native to the Brie region of France.",
    imageUrl:
      'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ihPVg4pIMBxo/v1/1000x-1.jpg',
    quantity: 4
  },
  {
    name: 'Mozzarella',
    price: '9.99',
    description:
      "Mozzarella is a traditionally southern Italian cheese made from Italian buffalo's milk by the pasta filata method. Fresh mozzarella is generally white but may vary seasonally to slightly yellow depending on the animal's diet.",
    imageUrl:
      'https://www.seriouseats.com/recipes/images/2015/10/20151017-pies-vicky-wasik-2-625x469.jpg',
    quantity: 1
  },
  {
    name: 'Parmigiano-Reggiano',
    price: '900',
    description:
      "Parmigiano-Reggiano or Parmesan is an Italian hard, granular cheese that is produced from cow's milk and has aged 12–36 months. It is named after the producing areas, the provinces of Parma, Reggio Emilia, the part of Bologna west of the Reno, and Modena; and the part of Mantua south of the Po.",
    imageUrl:
      'https://richmedia.ca-richimage.com/ImageDelivery/imageService?profileId=12026540&id=777941&recipeId=728',
    quantity: 2
  }
]

export function checkout() {
  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {/* <div>item 1</div> */}
      <div>
        {cart.map(cheese => (
          <checkoutCheese
            key={cheese.id}
            id={cheese.id}
            name={cheese.name}
            image={cheese.imageUrl}
            price={cheese.price}
            quantity={cheese.quantity}
          />
        ))}
      </div>
      <div className="totalAmount" />
      <Link to="/checkout">
        <button type="button">Proceed to Checkout</button>
      </Link>
    </div>
  )
}
const mapState = () => {}

const mapDispatch = () => {}

export default connect(mapState, mapDispatch)(checkout)
