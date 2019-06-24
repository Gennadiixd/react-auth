import React, { Component } from 'react';
import Form from '../form/form';
import { Container, Button } from 'reactstrap';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import Header from '../header'
import ProtectedPage from '../portected-page'
import { loginAC, logoutAC } from '../../redux/actions/actions'

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
});

class App extends Component {

  state = {
    registration: '/users/signup',
    login: '/users/login'
  }

  render() {
    const { logIn, logOut } = this.props;
    return (
      <div className='app'>
        <Container className='container'>
          <Header />
          <Route path='/registration' render={() => {
            return <Form url={this.state.registration} formType={'Registration Form'} logIn={logIn} isAuth={this.props.isAuth}/>
          }} />
          <Route path='/login' render={() => {
            return <Form url={this.state.login} formType={'Login Form'} logIn={logIn} isAuth={this.props.isAuth}/>
          }} />
          <Route path='/protected' render={() => {
            return <ProtectedPage isAuth={this.props.isAuth} logOut={logOut} />
          }} />
          <div id='info'></div>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logIn: () => { dispatch(loginAC()) },
    logOut: () => { dispatch(logoutAC()) },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

