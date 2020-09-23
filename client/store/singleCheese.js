import axios from 'axios'

const GET_SINGLE_CHEESE = 'GET_SINGLE_CHEESE'

export const getSingleCheese = cheese => {
  return {type: GET_SINGLE_CHEESE, cheese}
}

export const fetchSingleCheese = cheeseId => async dispatch => {
  try {
    const {data: cheese} = await axios.get(`/api/cheeses/${cheeseId}`)

    dispatch(getSingleCheese(cheese))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  cheese: {}
}

export default function singleCheeseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_CHEESE:
      return {...state, cheese: action.cheese}
    default:
      return state
  }
}
