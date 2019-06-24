import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'reactstrap';

export default class ProtectedPage extends Component {

    logOut = async (e) => {
        e.preventDefault()
        let res = await fetch(`/users/logout`, {
            method: 'GET',
            credentials: 'include',
        })
        let data = await res.json()
        if (data.status === 'Logged out') {
            this.props.logOut()
            document.getElementById('info').innerText = `Logged out`;
        }
    }

    render() {
        if (!this.props.isAuth) {
            return <Redirect to={'/'} />
        }

        return (
            <>
                <h3>If you see this, you are logged in</h3>
                <Button color="primary" onClick={this.logOut}>logOut</Button>
            </>
        )
    }
}
