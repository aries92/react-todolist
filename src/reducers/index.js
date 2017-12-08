import {combineReducers} from 'redux';
import { todoReducer } from './todo-reducer';
import { filterReducer } from './filter-reducer';

const reducers = combineReducers({
    todoReducer,
    filterReducer
});

export default reducers