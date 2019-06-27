import React, { Component } from 'react';
import Form from '../form/form';
import { Container } from 'reactstrap';
import { Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import Header from '../header'
import ProtectedPage from '../portected-page'
import * as actions from '../../redux/actions/actions'
import AuthHOC from '../authHOC'
import AuthService from '../../services/graphAuthService'

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
});

class App extends Component {

  render() {
    const { logIn, logOut, signUp, check } = new AuthService();
    const { loginAC, logoutAC } = this.props;

    const loginCombined = async (login, password) => {
      return logIn(login, password)
        .then(({ data }) => {
          const login = data.login.login
          if (login !== "Error") {
            loginAC()
            document.getElementById('info').innerText = `Welcome ${login}`;
          } else {
            document.getElementById('info').innerText = `${login}! incorrect login or password`;
          }
        })
        .catch(() => {
          document.getElementById('info').innerText = 'Server Error';
        })
    }

    const signupCombined = async (login, password) => {
      return signUp(login, password)
        .then(({ data }) => {
          const login = data.signup.login
          if (login !== "Error") {
            loginAC()
            document.getElementById('info').innerText = `Welcome ${login}`;
          } else {
            document.getElementById('info').innerText = `Smth goes wrong, try another login or password`;
          }
        })
        .catch((err) => {
          console.log(err)
          document.getElementById('info').innerText = 'Server Error';
        })
    }

    const logoutCombined = () => {
      logOut()
        .then(({ status }) => {
          logoutAC();
          document.getElementById('info').innerText = `${status}`;
        })
        .catch(() => { document.getElementById('info').innerText = 'Server Error'; })
    }

    return (
      <div className='app'>
        <Container className='container'>
          <Header logOut={logoutCombined} loggedIn={!!this.props.isAuth} />
          <Switch>
            <Route path='/registration' render={() => {
              return <Form formType={'Registration Form'} authFunc={signupCombined} check={check} />
            }} />
            <Route path='/login' render={() => {
              return <Form formType={'Login Form'} authFunc={loginCombined} check={check} />
            }} />
            <Route path='/protected' component={AuthHOC(ProtectedPage, check)} />
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

