import { createStore, combineReducers } from 'redux'
import Reducers from '../reducers/reducers'

const rootReducers = combineReducers({
    Reducers
})

const store = createStore(rootReducers);

export default store;