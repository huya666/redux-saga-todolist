import { put, call, take } from 'redux-saga/effects';
import { actionTypes } from '../common/actionTypes';
import { finishedlist, removelist, modifylist, clearlist } from '../api/list';

export function* removeItem(data) {
  try {
    return yield call(removelist, data)
  } catch (err) {
    yield put({type: actionTypes.ERROR})
  }
}

export function* removeItemFlow() {
  while (true) {
    let { data } = yield take(actionTypes.REMOVE_ITEM);
    let res = yield call(removeItem, data);
    let list = res.data.data;
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list
    })
  }
}

export function* toggleItem(data) {
  try {
    return yield call(finishedlist, data)
  } catch (err) {
    yield put({type: actionTypes.ERROR})
  }
}

export function* toggleItemFlow() {
  while (true) {
    let { data } = yield take(actionTypes.TOGGLE_ITEM);
    let res = yield call(toggleItem, data);
    let list = res.data.data;
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list
    })
  }
}

export function* modifyItem(data) {
  try {
    return yield call(modifylist, data)
  } catch (err) {
    yield put({type: actionTypes.ERROR})
  }
}

export function* modifyItemFlow() {
  while (true) {
    let { data } = yield take(actionTypes.MODIFY_ITEM)
    let res = yield call(modifyItem, data)
    let list = res.data.data
    yield put({
      type: actionTypes.UPDATE_DATA,
      data: list
    })
  }
}

export function* clearItem(){
  try{
    return yield call (clearlist)
  } catch(err){
    yield put ({type: actionTypes.ERROR})
  }
}

export function* clearItemFlow(){
  while(true){
    yield take(actionTypes.CLEAR_ITEM);
    let res = yield call(clearItem);
    let list  = res.data.data || [];
    yield put ({
      data: list,
      type: actionTypes.UPDATE_DATA
    })
  }
}