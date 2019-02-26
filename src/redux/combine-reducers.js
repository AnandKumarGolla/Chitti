import { combineReducers } from 'redux';
import ChitReducer from '../components/chits/chits.reducer'

const rootReducer = combineReducers(
    {
        ChitReducer
    }
)
export default rootReducer;