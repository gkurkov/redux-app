// import { applyMiddleware, createStore, compose } from 'redux'
// import { createStore } from 'redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import errorReducer from './errors'
import { logger } from './middleware/logger'
// import { thunk } from './middleware/thunk'
// import { taskReducer } from './task/reducer'
import taskReducer from './task'

// const middlewarEnhancer = applyMiddleware(logger, thunk)

// const initialState = [
//   { id: 1, title: 'Task 1', completed: false },
//   { id: 2, title: 'Task 2', completed: false },
// ]

// const store = createStore(taskReducer, initialState)
// function configureStore() {
//   // return createStore(taskReducer, initialState)
//   return createStore(
//     // taskReducer,
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     taskReducer,
//     compose(
//       middlewarEnhancer,
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   )
// }

// export default configureStore

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer
})

function createStore() {
  return configureStore({
    reducer: rootReducer,
    // reducer: taskReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

export default createStore
