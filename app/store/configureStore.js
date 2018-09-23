import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import placesReducer from './reducers/places'
import uiRducer from './reducers/ui'
import authRducer from './reducers/auth'

const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiRducer,
    auth: authRducer
})

let composeEnchancers = compose

if(__DEV__) {
    composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = () => {
    return createStore(rootReducer, composeEnchancers(applyMiddleware(thunk)))
}

export default configureStore