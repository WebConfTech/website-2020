import R from 'ramda';
import { combineReducers } from 'redux';
import { ORDER_SET_PASS_INFO } from './actionTypes';

const defaultPassHolder = {
  firstName: '',
  lastName: '',
  identityDocument: '',
  email: '',
  item: null,
};
const defaultPassHolders = [defaultPassHolder];
const passHolders = (state = defaultPassHolders, { type, payload }) => {
  switch (type) {
    case ORDER_SET_PASS_INFO:
      return R.adjust(payload.index, R.mergeLeft(payload.value))(state);
    default:
      return state;
  }
};

export const order = combineReducers({
  passHolders,
});
