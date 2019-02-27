import { connect } from 'react-redux';
import Chits from './chits.component'
import { updateAllChitList } from './chits.actions'

const mapStateToProps = (state) => {
    return {
        allChitList: state.ChitReducer.allChitList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateAllChitList: (value) => dispatch(updateAllChitList(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chits);