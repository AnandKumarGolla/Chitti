import { connect } from 'react-redux';
import Reports from './reports.component'
// import {updateAllChitList} from './addCustomer.actions'

const mapStateToProps = (state) => {
    return {
        allCustomerList: state.CustomerReducer.allCustomerList
    }
}

export default connect(mapStateToProps)(Reports);