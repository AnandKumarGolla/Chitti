import actionTypes from "../../redux/action-types";

const initialState = {
  allCustomerList: []
};

const CustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_ALL_CUSTOMER_LIST:
        return {
          ...state,
          allCustomerList: action.payload
        };
      default:
        return state;
    }
  };

export default CustomerReducer;
