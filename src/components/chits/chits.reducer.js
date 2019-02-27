import actionTypes from "../../redux/action-types";

const initialState = {
  allChitList: []
};

const ChitReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_ALL_CHIT_LIST:
      return {
        ...state,
        allChitList: action.payload
      };
    default:
      return state;
  }
};

export default ChitReducer;
