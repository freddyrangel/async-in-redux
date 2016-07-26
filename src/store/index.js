import { applyMiddleware, createStore } from 'redux';
import logger                           from './middleware/logger';
import thunk                            from './middleware/thunk';
import rootReducer                      from './root-reducer';

const middleware = applyMiddleware(logger, thunk)

const store = createStore(rootReducer, middleware);

export default store;
