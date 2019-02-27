import {connect} from 'react-redux';
import AddChit from './addChit.component'
// import {updateAllChitList} from './addCustomer.actions'

const mapStateToProps = (state) => {
    return {
        // allChitList: state.ChitReducer.allChitList
    }
}

export default connect(mapStateToProps)(AddChit);