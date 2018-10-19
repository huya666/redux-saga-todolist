
import { put, call, take } from 'redux-saga/effects';
import {actionTypes} from '../common/actionTypes';
import { addlist, getlistitem} from '../api/list'

function* getListItem(){
  try{
    return yield call(getlistitem)
  } catch(error){
    yield put({type: actionTypes.ERROR})
  }
}

export function* getListItemFlow(){
  while(true){
    yield take(actionTypes.GET_LIST_ITEM);
    let res = yield call(getListItem);
    if(res.data.code === 1){
      let list = res.data.data;
      yield put({
        type: actionTypes.UPDATE_DATA,
        data: list
      })
    }else{
      yield put({
        type: actionTypes.ERROR
      })
    }
  }
}


function* addItem(data) {
  try {
    return yield call(addlist, data)
  } catch (err) {
    yield put({type: actionTypes.ERROR})
  }
}


export function* addItemFlow() {
  while (true) {
    // let request = yield take(actionTypes.ADD_ITEM) //监听action
    let { data } = yield take(actionTypes.ADD_ITEM);
    let res = yield call(addItem, data) //调取addItem
    if(res.data.code === 1){
      let list = res.data.data;
      yield put({  //触发action
        type: actionTypes.UPDATE_DATA,
        data: list
      })
    }else{
      yield put({
        type: actionTypes.ERROR
      })
    }
  }
}
