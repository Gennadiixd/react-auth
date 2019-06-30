import React, { Component } from 'react';
import Form from '../form/form';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import Header from '../header'
import ProtectedPage from '../portected-page'
import * as actions from '../../redux/actions/actions'
import AuthHOC from '../authHOC'

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
});

class App extends Component {

  render() { 

    return (
      <div className='app'>
        <Container className='container'>
          <Header logOut={this.props.logoutCombinedThunk} loggedIn={!!this.props.isAuth} />
          <Switch>
            <Route path='/registration' render={() => {
              return <Form formType={'Registration Form'} authFunc={this.props.signupCombinedThunk}/>
            }} />
            <Route path='/login' render={() => {
              return <Form formType={'Login Form'} authFunc={this.props.loginCombinedThunk}/>
            }} />
            <Route path='/protected' component={AuthHOC(ProtectedPage)} />
          </Switch>
        </Container>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  actions,
)(App);

