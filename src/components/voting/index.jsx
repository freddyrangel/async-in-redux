import './index.css';
import React, { Component } from 'react';
import fetch                from 'isomorphic-fetch';
import { API_KEY }          from 'constants';

export default class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount() {
    this.fetchCatImage();
  }

  fetchCatImage = () => {
    const params = { api_key: API_KEY };
    fetch('http://thecatapi.com/api/images/get', params)
      .then((data) => this.setState({ data }))
      .catch((error) => console.log(error));
  };

  voteCatImage = (score) => {
    const params = {
      api_key  : API_KEY,
      method   : 'POST',
      mode     : 'no-cors',
      image_id : this.state.data.url,
      score
    };
    fetch('http://thecatapi.com/api/images/vote', params)
      .then((data) => this.fetchCatImage())
      .catch((error) => console.log(error));
  };

  handleUpvote = () => this.voteCatImage(10);

  handleDownvote= () => this.voteCatImage(1);

  render() {
    const { url } = this.state.data;
    return (
      <div className='voting-container'>
        <div className='vote-buttons'>
          <span>See Another?</span>
          <button className='love-it' onClick={this.handleUpvote}>Love it</button>
          <button className='hate-it' onClick={this.handleDownvote}>Hate it</button>
        </div>
        <div className='cat-image'>
          <img src={url} height='300'/>
        </div>
      </div>
    );
  }
}
