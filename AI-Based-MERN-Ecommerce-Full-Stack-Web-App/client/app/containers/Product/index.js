/*
 *
 * Product
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import actions from '../../actions';

// import { ROLES } from '../../constants';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import Page404 from '../../components/Common/Page404';

class Product extends React.PureComponent {
  render() {
    const { user, match } = this.props;

    return (
      <div className='product-dashboard'>
        <Switch>
          <Route exact path={match.path} component={List} />
          <Route exact path={`${match.path}/edit/:id`} component={Edit} />
          <Route exact path={`${match.path}/add`} component={Add} />
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default withRouter(connect(mapStateToProps, actions)(Product));
