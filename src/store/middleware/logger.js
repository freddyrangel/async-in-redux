export default store => next => action => {
  let result = next(action);
  console.log('dispatching', action);
  console.log('next state', store.getState());
  return result;
}
