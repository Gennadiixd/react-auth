import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'

export default class header extends Component {
    state = {
        links: [
            {
                text: "Login",
                to: "/login/"
            },
            {
                text: "Registration",
                to: "/registration/"
            },
            {
                text: "Protected Page",
                to: "/protected/"
            },
        ]
    }

    renderLinks = (links) => {
        return links.map((el) => {
            return <NavLink to={el.to} key={el.text}>{el.text}</NavLink>
        })
    }

    render() {
        const links = this.renderLinks(this.state.links)

        return (
            <>
                <div id='info'>Pls signup or login</div>
                <div className='header'>
                    <NavLink to='/' onClick={this.props.logOut}>Log out</NavLink>
                    {links}
                </div>
            </>
        )
    }
}
