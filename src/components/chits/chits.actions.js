import actionTypes from '../../redux/action-types'

  export const updateAllChitList = (value) => {
    return {
      type: actionTypes.UPDATE_ALL_CHIT_LIST,
      payload: value
    };
  };