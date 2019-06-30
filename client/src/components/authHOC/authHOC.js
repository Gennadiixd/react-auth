import React from 'react';
import Spinner from '../spinner';
import { Redirect } from 'react-router-dom';
import ErrorMessage from '../errrorMessage/errorMessage';
import AuthService from '../../services/graphAuthService';

function AuthHOC(View) {
    const { check } = new AuthService();

    return class extends React.Component {

        state = {
            isAuth: null,
            loading: true,
            error: false,
        }

        componentDidCatch() {
            this.setState({ error: true })
        }

        componentDidMount() {
            check()
                .then(({ data }) => {
                    const { login } = data.check
                    this.setState({
                        isAuth: !!login,
                        loading: false
                    })
                })
                .catch(() => {
                    document.getElementById('info').innerText = 'Server Error';
                })
        }

        render() {
            const { isAuth, loading, error } = this.state;

            if (error) {
                return <ErrorMessage />
            }

            const contentLoading = loading ? <Spinner /> : null
            const redirect = isAuth === false ? <Redirect to={'/'} /> : null
            const content = !(contentLoading || redirect) ? <View /> : null

            return (
                <>
                    {contentLoading}
                    {redirect}
                    {content}
                </>
            )
        }

    }
}

export default AuthHOC
