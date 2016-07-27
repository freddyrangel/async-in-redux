src/store/middleware/logger.js
```
export default ({getState, dispatch}) => next => action => {
  let result = next(action);
  console.log('dispatching', action);
  console.log('next state', getState());
  return result;
}
```

src/store/index.js
```
import { applyMiddleware, createStore } from 'redux';
import rootReducer                      from 'reducers';
import logger                           from './middleware/logger';

const middleware = applyMiddleware(logger);

const store = createStore(rootReducer, middleware);

export default store;
```
