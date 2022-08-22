import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Layout from './components/Layout';
import { authCheckState, authLogout } from './store/actions/auth.actions';
import { selectAuthToken, selectIsAuthenticated } from './store/selectors';
import Urls from './Urls';

function App(props) {
  useEffect(() => {
    props.setAuthenticatedIfRequired();
  }, []);
  return (
    <div className="App">
      <Layout {...props}>
        <Urls {...props} />
      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
  authToken: selectAuthToken(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticatedIfRequired: () => dispatch(authCheckState()),
    logout: () => dispatch(authLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
