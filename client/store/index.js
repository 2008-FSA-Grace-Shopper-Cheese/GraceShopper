import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cheesesReducer from './cheeses'
import singleCheeseReducer from './singleCheese'
import cheeseCartReducer from './cheeseCart'

const reducer = combineReducers({
  user,
  cheesesReducer,
  singleCheeseReducer,
  cheeseCartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
