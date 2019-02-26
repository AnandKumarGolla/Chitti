import {connect} from 'react-redux';
import Chits from './chits.component'
import {updateFilteredChitList, updateAllChitList, searchFilterFunction} from './chits.actions'

const mapStateToProps = (state) => {
    return {
        filteredChitList: state.ChitReducer.filteredChitList,
        allChitList: state.ChitReducer.allChitList
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        updateFilteredChitList: (value) => dispatch(updateFilteredChitList(value)),
        updateAllChitList: (value) => dispatch(updateAllChitList(value)),
        searchFilterFunction: (text, allChitList) => dispatch(searchFilterFunction(text, allChitList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chits);