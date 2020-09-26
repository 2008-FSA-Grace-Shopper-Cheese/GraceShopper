import axios from 'axios'

// action Type

const GET_CHEESECART = 'GET_CHEESECART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const DELETE_CHEESE = 'DELETE_CHEESE'

//action creator

export const getCheeseCart = cheeseCart => {
  console.log('action')
  return {type: GET_CHEESECART, cheeseCart}
}

export const deletedCheeseCart = cheese => {
  console.log('action creator is running', cheese)
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
    // console.log('cheesecart======>', cheeseCart)
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

// export const changedQuantity = (cheeseId, qty) => {
//   return {type: CHANGE_QUANTITY, cheeseId, qty}
// }
export const changeQuantity = (qty, cheeseId) => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const id = res.data.id
    await axios.put(`/api/cheeseCart/${id}`, {cheeseId, qty})
    const {data: cheeseCart} = await axios.get(`/api/cheeseCart/${id}`)
    dispatch(getCheeseCart(cheeseCart))

    // dispatch(changedQuantity(cheeseId, qty))
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
      // console.log('fire reducer')
      return {...state, cheeseCart: action.cheeseCart}
    case DELETE_CHEESE:
      console.log('reducer is running', action)
      return {
        ...state,
        cheeseCart: [...state.cheeseCart].filter(
          cheese => cheese.id !== action.cheeseId
        )
      }
    //       case CHANGE_QUANTITY:
    // let newState = {...state}
    //filter state where (cheeseId !=== id)

    default:
      return state
  }
}
