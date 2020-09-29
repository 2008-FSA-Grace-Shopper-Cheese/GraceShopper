/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as ShoppingCart} from './shoppingCart'
export {default as AllCheese} from './AllCheese'
export {default as SingleCheese} from './SingleCheese'

export {default as Checkout} from './checkout'
export {default as Fulfillment} from './fulfillment'
export {default as PurchaseHistory} from './purchase-history'
export {AboutUs} from './about-us.js'
export {Support} from './Support'
