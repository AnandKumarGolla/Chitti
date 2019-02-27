import actionTypes from '../../redux/action-types'

export const updateAllCustomerList = (value) => {
  return {
    type: actionTypes.UPDATE_ALL_CUSTOMER_LIST,
    payload: value
  };
};