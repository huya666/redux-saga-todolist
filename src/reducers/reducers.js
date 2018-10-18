import {actionTypes} from '../common/actionTypes'

const initState = {
  list: []
}

export function getTodoList(state=initState, action){
  switch(action.type){
    case actionTypes.UPDATE_DATA:
      return {
        ...state,
        list: action.data
      }
    default:
      return state
  }
}