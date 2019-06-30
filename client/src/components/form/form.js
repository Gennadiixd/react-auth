import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ErrorMessage from '../errrorMessage/errorMessage';

export default class UserForm extends Component {

    state = {
        login: '',
        password: '',
        error: false
    }
   
    componentDidCatch() {
        this.setState({ error: true })
    }

    inputHandler = async (e) => {
        await this.setState({ [e.target.name]: [e.target.value] })
    }

    submitHandler = async (e) => {
        e.preventDefault()
        this.props.authFunc(this.state.login, this.state.password)
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <>
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
            </>
        );
    }
}




