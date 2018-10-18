import { actionTypes } from '../common/actionTypes'

export function getListItem(){
  return {
    type: actionTypes.GET_LIST_ITEM
  }
}

export function addItem(data) {
  return {
    type: actionTypes.ADD_ITEM,
    data
  }
}

export function removeItem(data) {
  return {
    type: actionTypes.REMOVE_ITEM,
    data
  }
}

export function toggleItem(data) {
  return {
    type: actionTypes.TOGGLE_ITEM,
    data
  }
}

export function modifyItem(data) {
  return {
    type: actionTypes.MODIFY_ITEM,
    data
  }
}

export function clearItem(){
  return {
    type: actionTypes.CLEAR_ITEM
  }
}