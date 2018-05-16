import React from "react"

import "./admin.css" 

const Admin = ()=>{
    return (
        <div >
            <form className = 'user-form'>
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
export default Admin;