// import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'
import { createAction, createSlice } from '@reduxjs/toolkit'
import todoService from '../services/todos.service'
import { setError } from './errors'

// const update = createAction('task/updated') //без createSlice
// const remove = createAction('task/removed') //без createSlice

// const initialState = [
//   { id: 1, title: 'Task 1', completed: false },
//   { id: 2, title: 'Task 2', completed: false },
// ]

// const initialState = []

// без редьюсера error (error.js)
// const initialState = { entities: [], isLoading: true, error: null }

const initialState = { entities: [], isLoading: true }

// const TASK_UPDATED = 'task/updated'
// const TASK_DELETED = 'task/deleted'

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    received(state, action) {
      // return action.payload
      state.entities = action.payload
      state.isLoading = false
    },
    create(state, action) {
      console.log('action', action)
      console.log('state.entities', state.entities)
      state.entities.push({
        title: action.payload.title,
        completed: false,
      })
    },
    update(state, action) {
      // const elementIndex = state.findIndex((el) => el.id === action.payload.id)
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      // state[elementIndex] = { ...state[elementIndex], ...action.payload }
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      }
    },
    remove(state, action) {
      // return state.filter((el) => el.id !== action.payload.id)
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      )
    },
    taskRequested(state, action) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      // без редьюсера error (error.js)
      // state.error = action.payload
      state.isLoading = false
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const { update, create, remove, received, taskRequested, taskRequestFailed } =
  actions

// const taskRequested = createAction('task/requested')
// const taskRequestFailed = createAction('task/requestFailed')

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todoService.fetch()
    dispatch(received(data))
  } catch (error) {
    // без редьюсера error (error.js)
    // dispatch(taskRequestFailed(error.message))
    dispatch(taskRequestFailed())
    dispatch(setError(error))
  }
}

export const createTask = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todoService.post()
    dispatch(create(data))
  } catch (error) {
    // без редьюсера error (error.js)
    // dispatch(taskRequestFailed(error.message))
    dispatch(taskRequestFailed())
    dispatch(setError(error))
  }
}

// export const completeTask = (taskId) => (dispatch, getState) => {
export const completeTask = (id) => (dispatch, getState) => {
  // dispatch(taskCompleted(taskId))
  dispatch(update({ id, completed: true }))
}

// export function taskCompleted(id) {
//   return update({ id, completed: true })
//   //   return {
//   //     type: TASK_UPDATED,
//   //     payload: { id, completed: true },
//   //   }
// }

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` })
  //   return {
  //     type: TASK_UPDATED,
  //     payload: { id, title: `New title for ${id}` },
  //   }
}

export function taskDeleted(id) {
  return remove({ id })
  //   return {
  //     type: TASK_DELETED,
  //     payload: { id },
  //   }
}

export function taskCreated(id) {
  return create({
    userId: id,
    title: 'New task',
    completed: false,
  })
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

// без createSlice:
// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex((el) => el.id === action.payload.id)
//       state[elementIndex] = { ...state[elementIndex], ...action.payload }
//     })
//     .addCase(remove, (state, action) => {
//       // нужно явно указать изменения (прямая мутация)
//       return state.filter((el) => el.id !== action.payload.id)
//     })
// })

// без TOOLKIT:

// function taskReducer(state = [], action) {
//   switch (action.type) {
//     case update.type: {
//       // case TASK_UPDATED: {
//       const newArray = [...state]
//       const elementIndex = newArray.findIndex(
//         (el) => el.id === action.payload.id
//       )
//       newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
//       return newArray
//     }
//     case remove.type: {
//       //case TASK_DELETED: {
//       return state.filter((el) => el.id !== action.payload.id)
//     }
//     default:
//       return state
//   }
// }

export default taskReducer
