import { fork } from 'redux-saga/effects';
import { addItemFlow, getListItemFlow } from '../saga/addItemFlow';
import { removeItemFlow, toggleItemFlow, modifyItemFlow, clearItemFlow } from '../saga/sagaList';
export default function * rootSaga(){
  yield fork(getListItemFlow);
  yield fork(addItemFlow);
  yield fork(removeItemFlow);
  yield fork(toggleItemFlow);
  yield fork(modifyItemFlow);
  yield fork(clearItemFlow);
}