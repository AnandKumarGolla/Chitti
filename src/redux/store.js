import { createStore, applyMiddleware } from "redux";
import RootReducer from "../redux/combine-reducers";
import ReduxThunk from "redux-thunk";

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));

export default store;