export function logger(state) {
  // export function logger({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // console.log(store)
      // console.log(next)
      // console.log(action)

      //   if (action.type === 'task/update') {
      //     return dispatch({ type: 'task/remove', payload: { ...action.payload } }) // меняем действие на удаление
      //   }

      return next(action)
    }
  }
}
