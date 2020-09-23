import axios from 'axios'

const GET_CHEESES = 'GET_CHEESES'

export const getCheeses = cheeses => {
  return {type: GET_CHEESES, cheeses}
}

export const fetchCheeses = () => async dispatch => {
  try {
    const {data: cheeses} = await axios.get('/api/cheeses')
    dispatch(getCheeses(cheeses))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  cheeses: []
}

export default function cheesesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHEESES:
      return {...state, cheeses: action.cheeses}
    default:
      return state
  }
}
