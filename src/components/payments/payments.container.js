import { connect } from 'react-redux';
import Payments from './payments.component'
// import {updateAllChitList} from './addCustomer.actions'

const mapStateToProps = (state) => {
    return {
        // allChitList: state.ChitReducer.allChitList
    }
}

export default connect(mapStateToProps)(Payments);