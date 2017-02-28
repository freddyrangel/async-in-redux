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
