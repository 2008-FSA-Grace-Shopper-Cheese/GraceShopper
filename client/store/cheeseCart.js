import axios from 'axios'

const GET_CHEESECART = 'GET_CHEESECART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const DELETE_CHEESE = 'DELETE_CHEESE'

export const getCheeseCart = cheeseCart => {
  return {type: GET_CHEESECART, cheeseCart}
}

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

// export const deletedCheese = (cheeseId)=>{
//     return {
//         type:DELETE_CHEESE
//     }
// }

export const deleteCheese = cheeseId => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    const id = res.data.id
    await axios.delete(`/api/cheeseCart/${id}`, {cheeseId})
    const {data: cheeseCart} = await axios.get(`/api/cheeseCart/${id}`)
    dispatch(getCheeseCart(cheeseCart))
  } catch (error) {
    console.error(error)
  }
}

// export const changedQuantity = (cheeseId, qty) => {
//   return {type: CHANGE_QUANTITY, cheeseId, qty}
// }
export const changeQuantity = (cheeseId, qty) => async dispatch => {
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
    //       case CHANGE_QUANTITY:
    // let newState = {...state}

    default:
      return state
  }
}
