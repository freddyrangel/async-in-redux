import { connect }  from 'react-redux';
import Counter      from './counter.jsx';
import * as actions from './actions';

function mapStateToProps(state) {
  return {
    catCount: state.catCount
  };
}

export default connect(mapStateToProps, actions)(Counter);
