import actionTypes from "../../redux/action-types";

const initialState = {
  filteredChitList: [],
  allChitList: []
};

const ChitReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.UPDATE_FILTERED_CHIT_LIST:
        return {
          ...state,
          filteredChitList: action.payload
        };

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
