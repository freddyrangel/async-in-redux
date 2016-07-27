import './index.css';
import React, { Component } from 'react';
import Voting               from 'components/voting';
import Counter              from 'components/counter';
import logo                 from './assets/logo.svg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { showCounter: false };
  }

  handleClick = () => {
    this.setState({ showCounter: !this.state.showCounter });
  }

  render() {
    const { showCounter } = this.state;
    return (
      <div className='app'>
        <div className='app-header'>
          <img src={logo} className='app-logo' alt='logo' />
          <h2>Cat Voting App</h2>
        </div>
        <div className="nav">
          <button onClick={this.handleClick}>
            { `Go to ${showCounter ? 'Voting' : 'Counter'}` }
          </button>
        </div>
        { showCounter ? <Counter /> : <Voting /> }
      </div>
    );
  }
}
