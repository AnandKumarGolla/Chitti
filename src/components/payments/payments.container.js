import { connect } from 'react-redux';
import Payments from './payments.component'
// import {updateAllChitList} from './addCustomer.actions'

const mapStateToProps = (state) => {
    return {
        allCustomerList: state.CustomerReducer.allCustomerList
    }
}

export default connect(mapStateToProps)(Payments);