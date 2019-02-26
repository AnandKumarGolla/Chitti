import {connect} from 'react-redux';
import Customers from './customers.component'
import {updateAllCustomerList} from './customers.actions'

const mapStateToProps = (state) => {
    return {
        allCustomerList: state.CustomerReducer.allCustomerList
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        updateAllCustomerList: (value) => dispatch(updateAllCustomerList(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customers);