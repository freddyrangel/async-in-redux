import './index.css';
import React, { Component } from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { catCount: 1 };
  }

  handleIncrement = () => this.setState({catCount: this.state.catCount + 1});

  handleDecrement = () => this.setState({catCount: this.state.catCount - 1});

  render() {
    const { catCount } = this.state;
    const cats = [];
    for (let i = 0; i < catCount; i++) {
      cats.push(<CatImage key={i}/>)
    }
    return (
      <div className='counter-container'>
        <div className='buttons'>
          <button className='increment' onClick={this.handleIncrement}>More Cats</button>
          <button className='decrement' onClick={this.handleDecrement}>Fewer Cats</button>
        </div>
        { cats }
      </div>
    );
  }
}

function CatImage() {
  return <img width='200' src='http://thecatapi.com/api/images/get?format=src&type=gif'/>
}
