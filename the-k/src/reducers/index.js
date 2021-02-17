import idReducer from 'reducers/hasID';
import nameReducer from 'reducers/hasName';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
	id: idReducer,
	name: nameReducer
})

export default allReducers;
