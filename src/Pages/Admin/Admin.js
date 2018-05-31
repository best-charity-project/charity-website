import React, { Component } from 'react';
import {BrowserRouter , Route , Switch , NavLink } from "react-router-dom";

import AdminMain from "../../Components/Admin/AdminMain/AdminMain";
import AdminEvents from "../../Components/Admin/AdminEvents/AdminEvents";
import NavBar from "../../Components/NavBar/NavBar";
import Navigation from "../../Components/Navigation/Navigation";
import Button from "../../Components/Button/Button";

import "./Admin.css";

export default class Admin extends React.Component {
    state = {
        loggedIn: false
    }
    componentDidMount
    onLogout = () => {
        this.setState({loggedIn:false})
    }
    onSubmit = e => {
        e.preventDefault();
        this.setState({ loggedIn: true })
    }

    render() {
        const { loggedIn } = this.state
        if (loggedIn) {
            return (
                <div className="wrapper-admin">
                    <Navigation onLogout={this.onLogout} />
                    <div className="main-admin">
                    <NavBar/>
                    <Switch>
                        <Route path="/admin-panel" component={AdminMain} exact />
                        <Route path="/admin-panel/events" component={AdminEvents}/>
                        {/* <Route path="/admin-panel/news" component={AdminNews}/> */}
                    </Switch>
                    </div>
              </div>          
        )  
        } else {
            return (
                <div className="wrapper-admin auth-form">
                    <form className = 'user-form' onSubmit={this.onSubmit}>
                        <div className="container-admin">
                            <div className='username-div'>
                                <input type="text" placeholder="Enter Username" name="username" required className="username-input"/>
                            </div>
        
                            <div className="password-div">
                                <input type="password" placeholder="Enter Password" name="password" required className="password-input" />
                            </div>
                            
                            <Button type="submit" name="button-admin-login" label="Sign In" />
                        </div>
                    </form>
                </div>          
            )  
        }
        
    }
}
