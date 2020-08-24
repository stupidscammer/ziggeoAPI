import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import logo from '../logo.svg';

class Header extends Component {
    render() {
        return (
            <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>React Ziggeo Application</h2>
            <nav>
                <ul className="list-inline">
                    {
                        routes.map(({path, title, inNavigation}, i) =>
                            inNavigation && <li key={i}>
                                <NavLink to={`/${path}`}>
                                    {title}
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
            </nav>
            </div>
        );
    }
}

export default Header;
