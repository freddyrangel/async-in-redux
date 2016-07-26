import { connect }  from 'react-redux';
import Voting       from './voting';
import * as actions from './actions';

function mapStateToProps(state) {
  return {
    data: state.catData
  };
}

export default connect(mapStateToProps, actions)(Voting);
