import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class UserForm extends Component {

    state = {
        login: '',
        password: '',
    }

    amILoggedIn = async (e) => {
        e.preventDefault()
        let res = await fetch(`/users/check`, {
            method: 'GET',
            credentials: 'include',
        })
        let data = await res.json()
        alert(!!data)
    }

    inputHandler = async (e) => {
        await this.setState({ [e.target.name]: [e.target.value] })
    }

    submitHandler = async (e) => {
        e.preventDefault()
        let res = await fetch(`${this.props.url}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "login": this.state.login,
                "password": this.state.password
            })
        })
        let data = await res.json()
        if (data.login === this.state.login[0]) {
            this.props.logIn()
            document.getElementById('info').innerText = `Success! Welcome, ${data.login}`;
        } else {
            document.getElementById('info').innerText = `Smth goes wrong, try another login or password`;
        }
    }

    render() {
        return (
            <>


                {!this.props.isAuth && <>
                    <h3>{this.props.formType}</h3>
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                            <Input onChange={this.inputHandler} type="login" name="login" id="exampleLogin" placeholder="your login" value={this.state.login} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="examplePassword" className="mr-sm-2">Password</Label>
                            <Input onChange={this.inputHandler} type="password" name="password" id="examplePassword" placeholder="your password" value={this.state.password} />
                        </FormGroup>
                        <Button color="primary" onClick={this.submitHandler}>Submit</Button>
                    </Form>
                </>}

                <Button color="primary" onClick={this.amILoggedIn}>Auth TEST</Button>
            </>
        );
    }
}




