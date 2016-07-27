src/index.js
```
import 'babel-polyfill';
import './index.css';
import React        from 'react';
import { Provider } from 'react-redux';
import { render }   from 'react-dom';
import store        from 'store';
import App          from './components/app';

const Application = <Provider store={store}>
  <App />
</Provider>

render(Application, document.getElementById('root'));
```

src/store/index.js
```
import { createStore } from 'redux';
import rootReducer     from 'reducers';

const store = createStore(rootReducer);

export default store;
```

src/reducers/index.js
```
import { combineReducers } from 'redux';
import catCountReducer     from './cat-count-reducer';

export default combineReducers({
  catCount: catCountReducer
});
```

src/reducers/cat-count-reducer
```
import {
  INCREMENT_CAT_COUNT,
  DECREMENT_CAT_COUNT
} from 'constants';

export default function(state = 0, {type, payload}) {
  switch (type) {
    case INCREMENT_CAT_COUNT:
      return state + 1;
    case DECREMENT_CAT_COUNT:
      return state - 1;
    default:
      return state;
  }
}
```

src/constants.js
```
export const API_KEY = 'MTA0NzM4';
export const INCREMENT_CAT_COUNT = 'INCREMENT_CAT_COUNT';
export const DECREMENT_CAT_COUNT = 'DECREMENT_CAT_COUNT';
```

src/actions/counter-actions.js
```
import {
  INCREMENT_CAT_COUNT,
  DECREMENT_CAT_COUNT
} from 'constants';

export function incrementCatCount() {
  return {
    type: INCREMENT_CAT_COUNT
  }
}

export function decrementCatCount() {
  return {
    type: DECREMENT_CAT_COUNT
  }
}
```

src/components/counter/index.js
```
import './index.css';
import React        from 'react';
import { connect }  from 'react-redux';
import * as actions from 'actions/counter-actions';

function Counter({catCount, incrementCatCount, decrementCatCount}) {
  const cats = [];
  for (let i = 0; i < catCount; i++) {
    cats.push(<CatImage key={i}/>)
  }
  return (
    <div className='counter-container'>
      <div className='buttons'>
        <button className='increment' onClick={incrementCatCount}>More Cats</button>
        <button className='decrement' onClick={decrementCatCount}>Fewer Cats</button>
      </div>
      { cats }
    </div>
  );
}

function CatImage() {
  return <img width='200' src='http://thecatapi.com/api/images/get?format=src&type=gif'/>
}

function mapStateToProps(state) {
  return {
    catCount: state.catCount
  };
}

export default connect(mapStateToProps, actions)(Counter);
```
