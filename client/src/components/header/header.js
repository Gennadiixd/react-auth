import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'

export default class header extends Component {
    render() {
        return (
            <>
                <h4>Pls signup or login</h4>
                <div className='header'>
                    <NavLink to="/login/">Login</NavLink>
                    <NavLink to="/registration/">Registration</NavLink>
                    <NavLink to="/protected/">Protected Page</NavLink>
                </div>
            </>
        )
    }
}
