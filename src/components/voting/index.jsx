import './index.css';
import React, { Component } from 'react';
import { connect }          from 'react-redux';
import * as actions         from 'actions/voting-actions';

class Voting extends Component {

  componentDidMount() {
    this.props.fetchCatImage();
  }

  render() {
    const { url } = this.props.data;
    return (
      <div className='voting-container'>
        <div className='vote-buttons'>
          <span>See Another?</span>
          <button className='love-it' onClick={this.props.upvote}>Love it</button>
          <button className='hate-it' onClick={this.props.downvote}>Hate it</button>
        </div>
        <div className='cat-image'>
          <img src={url} height='300'/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.catData
  };
}

export default connect(mapStateToProps, actions)(Voting);
