import React, { Component } from 'react';
import Form from '../form/form';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import Header from '../header'
import ProtectedPage from '../portected-page'
import { loginAC, logoutAC } from '../../redux/actions/actions'
import AuthHOC from '../authHOC'
import AuthService from '../../services/authService'

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
});

class App extends Component {

  render() {
    const { logIn, logOut, signUp, check } = new AuthService();
    const { logInRedux, logOutRedux } = this.props;

    const loginCombined = async (login, password) => {
      return logIn(login, password)
        .then(({ isAuth, status }) => {
          if (isAuth) {
            logInRedux()
            document.getElementById('info').innerText = `${status}`;
          } else {
            document.getElementById('info').innerText = `${status}`;
          }
        })
        .catch(() => {
          document.getElementById('info').innerText = 'Server Error';
        })
    }

    const signupCombined = async (login, password) => {
      return signUp(login, password)
        .then(({ status }) => {
          if (status) {
            logInRedux()
            document.getElementById('info').innerText = `${status}`;
          } else {
            document.getElementById('info').innerText = `Smth goes wrong, try another login or password`;
          }
        })
        .catch(() => {
          document.getElementById('info').innerText = 'Server Error';
        })
    }

    const logoutCombined = () => {
      logOut()
        .then(({ status }) => {
          logOutRedux();
          document.getElementById('info').innerText = `${status}`;
        })
        .catch(() => { document.getElementById('info').innerText = 'Server Error'; })
    }

    return (
      <div className='app'>
        <Container className='container'>
          <Header logOut={logoutCombined} loggedIn={!!this.props.isAuth} />
          <Route path='/registration' render={() => {
            return <Form formType={'Registration Form'} authFunc={signupCombined} check={check} />
          }} />
          <Route path='/login' render={() => {
            return <Form formType={'Login Form'} authFunc={loginCombined} check={check} />
          }} />
          <Route path='/protected' component={AuthHOC(ProtectedPage, check)} />
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logInRedux: () => { dispatch(loginAC()) },
    logOutRedux: () => { dispatch(logoutAC()) },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

