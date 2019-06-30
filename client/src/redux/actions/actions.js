import { LOG_IN, LOG_OUT } from './actionTypes'
import AuthService from '../../services/graphAuthService'

export const loginAC = (user) => ({
    type: LOG_IN,
    payload: {
        user
    }
})

export const logoutAC = () => ({
    type: LOG_OUT,
})

const { logIn, signUp, logOut } = new AuthService();

export const loginCombinedThunk = (login, password) => {
    return (dispatch) => {
        return logIn(login, password)
            .then(({ data }) => {
                const login = data.login.login
                if (login !== "Error") {
                    dispatch(loginAC())
                    document.getElementById('info').innerText = `Welcome ${login}`;
                } else {
                    document.getElementById('info').innerText = `${login}! incorrect login or password`;
                }
            })
            .catch(() => {
                document.getElementById('info').innerText = 'Server Error';
            })
    }
}

export const signupCombinedThunk = (login, password) => {
    return (dispatch) => {
        return signUp(login, password)
            .then(({ data }) => {
                const login = data.signup.login
                if (login !== "Error") {
                    dispatch(loginAC())
                    document.getElementById('info').innerText = `Welcome ${login}`;
                } else {
                    document.getElementById('info').innerText = `Smth goes wrong, try another login or password`;
                }
            })
            .catch((err) => {
                document.getElementById('info').innerText = 'Server Error';
            })
    }
}

export const logoutCombinedThunk = () => {
    return (dispatch) => {
        return logOut()
            .then(({ data }) => {
                const login = data.logout.login
                dispatch(logoutAC());
                document.getElementById('info').innerText = `${login}`;
            })
            .catch(() => { document.getElementById('info').innerText = 'Server Error'; })
    }
}