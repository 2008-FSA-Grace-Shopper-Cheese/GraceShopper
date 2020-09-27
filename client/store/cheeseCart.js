import axios from 'axios'

// action Type

const GET_CHEESECART = 'GET_CHEESECART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const DELETE_CHEESE = 'DELETE_CHEESE'

//action creator

export const getCheeseCart = cheeseCart => {
  return {type: GET_CHEESECART, cheeseCart}
}

export const deletedCheeseCart = cheese => {
  return {
    type: DELETE_CHEESE,
    cheeseId: cheese
  }
}

// ThunkCreator

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

export const deleteCheese = (cheeseId, userId) => async dispatch => {
  try {
    await axios.delete(`/api/cheeseCart/${userId}/${cheeseId}`)
    dispatch(fetchCheeseCart())
  } catch (error) {
    console.error(error)
  }
}

export const changeQuantity = (qty, cheeseId) => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const id = res.data.id

    await axios.put(`/api/cheeseCart/${id}`, {cheeseId, qty})
    const {data: cheeseCart} = await axios.get(`/api/cheeseCart/${id}`)
    dispatch(getCheeseCart(cheeseCart))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  cheeseCart: [],
  guestCart: []
}

export default function cheeseCartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHEESECART:
      return {...state, cheeseCart: action.cheeseCart}
    case DELETE_CHEESE:
      return {
        ...state,
        cheeseCart: [...state.cheeseCart].filter(
          cheese => cheese.id !== action.cheeseId
        )
      }
    default:
      return state
  }
}
