import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { getError } from './store/errors'
// import { createStore } from './store/createStore'
// import { taskReducer } from './store/taskReducer'
// import * as actions from './store/task/actions'
// import { taskCompleted, titleChanged, taskDeleted } from './store/task'
import configureStore from './store/store'
import {
  completeTask,
  titleChanged,
  taskDeleted,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
  createTask,
} from './store/task'

const store = configureStore()

const App = (params) => {
  // без useSelector
  // const [state, setState] = useState(store.getState())

  // const state = useSelector((state) => state)

  // без дополнительного редьюсера (error.js)
  // const state = useSelector((state) => state.entities)

  // без селекторов
  // const state = useSelector((state) => state.tasks.entities)
  const state = useSelector(getTasks())

  // const isLoading = useSelector((state) => state.isLoading)
  // без селекторов
  // const isLoading = useSelector((state) => state.tasks.isLoading)
  const isLoading = useSelector(getTasksLoadingStatus())

  // без дополнительного редьюсера (error.js)
  // const error = useSelector((state) => state.error)
  // const error = useSelector((state) => state.errors.entities[0])
  const error = useSelector(getError())

  const dispatch = useDispatch()

  useEffect(() => {
    //без селекторов
    // dispatch(getTasks())
    dispatch(loadTasks())

    //без useDispatch
    // store.dispatch(getTasks())

    //без useSelector
    // store.subscribe(() => {
    //   setState(store.getState())
    // })
  }, [dispatch])

  // const completeTask = (taskId) => {
  //   // store.dispatch({ type: 'task/completed', payload: { id: taskId } })
  //   // store.dispatch(actions.taskCompleted(taskId))
  //   // store.dispatch(taskCompleted(taskId))
  //   store.dispatch((dispatch, getState) => {
  //     store.dispatch(taskCompleted(taskId))
  //   })
  // }

  const changeTitle = (taskId) => {
    // store.dispatch(actions.titleChanged(taskId))
    dispatch(titleChanged(taskId))
    // без useDispatch
    // store.dispatch(titleChanged(taskId))
  }
  const deleteTask = (taskId) => {
    // store.dispatch(actions.taskDeleted(taskId))
    dispatch(taskDeleted(taskId))
    // без useDispatch
    // store.dispatch(taskDeleted(taskId))
  }

  const taskCreated = (obj) => {
    dispatch(createTask(obj))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <>
      <button
        onClick={() =>
          taskCreated({ title: '12345', id: 201, completed: false })
        }
      >
        Create task
      </button>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              {/* без useDispatch
            <button onClick={() => store.dispatch(completeTask(el.id))}> */}
              Complete
            </button>
            <button onClick={() => changeTitle(el.id)}>Change title</button>
            <button onClick={() => deleteTask(el.id)}>Delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
