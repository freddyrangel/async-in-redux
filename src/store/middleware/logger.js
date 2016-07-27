export default ({getState, dispatch}) => next => action => {
  let result = next(action);
  console.log('dispatching', action);
  console.log('next state', getState());
  return result;
}
