import React from "react"

import "./admin.css" 

export default class Admin extends React.Component {
    state = {
        loggedIn: false
    }

    onSubmit = e => {
        e.preventDefault();

        this.setState({ loggedIn: true })
    }

    render() {
        const { loggedIn } = this.state
        if (loggedIn) {
          return (
            <div >
               {/* <aside>
                   <menu>
               </aside> */}
                component topbar
                router switch 3 routes
            </div>          
        )  
        } else {
            return (
                <div >
                    <form className = 'user-form' onSubmit={this.onSubmit}>
                        <div className="container">
                            <div className='username-div'>
                                <input type="text" placeholder="Enter Username" name="username" required className="username-input"/>
                            </div>
        
                            <div className="password-div">
                                <input type="password" placeholder="Enter Password" name="password" required className="password-input" />
                            </div>
                            
                            <button type="submit" className="password-btn">Sign In</button>
                        </div>
                    </form>
                </div>          
            )  
        }
        
    }
}
