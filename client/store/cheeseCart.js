import axios from 'axios'
import store from './index'

const GET_CHEESECART = 'GET_CHEESECART'

export const getCheeseCart = cheeseCart => {
  console.log('fire')
  return {type: GET_CHEESECART, cheeseCart}
}

export const fetchCheeseCart = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')

    const id = res.data.id

    const {data: cheeseCart} = await axios.get(`/api/cheeseCart/${id}`)
    console.log('cheesecart======>', cheeseCart)
    dispatch(getCheeseCart(cheeseCart))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  cheeseCart: []
}

export default function cheeseCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHEESECART:
      console.log('fire reducer')
      return {...state, cheeseCart: action.cheeseCart}
    default:
      return state
  }
}
