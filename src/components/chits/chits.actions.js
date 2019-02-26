import actionTypes from '../../redux/action-types'

export const updateFilteredChitList = (value) => {
    return {
      type: actionTypes.UPDATE_FILTERED_CHIT_LIST,
      payload: value
    };
  };

  export const updateAllChitList = (value) => {
    return {
      type: actionTypes.UPDATE_ALL_CHIT_LIST,
      payload: value
    };
  };

  export const searchFilterFunction = (text, allChitList) => dispatch => {
    const newData = allChitList.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    dispatch(updateFilteredChitList(newData))
  };