import { combineReducers } from 'redux';
import ChitReducer from '../components/chits/chits.reducer'
import CustomerReducer from '../components/customers/customers.reducer'

const rootReducer = combineReducers(
    {
        ChitReducer,
        CustomerReducer
    }
)
export default rootReducer;