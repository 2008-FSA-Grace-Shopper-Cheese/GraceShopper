import axios from 'axios'

const GET_CHEESECART = 'GET_CHEESECART'

export const getCheeseCart = cheeseCart => {
  return {type: GET_CHEESECART, cheeseCart}
}

export const fetchCheeseCart = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')

    const id = res.data.id

    const {data: cheeseCart} = await axios.get(`/api/cheeseCart/${id}`)

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
      return {...state, cheeseCart: action.cheeseCart}
    default:
      return state
  }
}
