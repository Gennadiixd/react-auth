import React from 'react'
import Spinner from '../spinner'
import { Redirect } from 'react-router-dom'
import ErrorMessage from '../errrorMessage/errorMessage';

export default function AuthHOC(View, checkAuth) {

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
            checkAuth()
                .then(({ isAuth }) => {
                    this.setState({
                        isAuth,
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
