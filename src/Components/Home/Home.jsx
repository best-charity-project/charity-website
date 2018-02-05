
import React from 'react';
import './Home.css';
import ThreeNews from './ThreeNews';
import './main.css';


class Home extends React.Component {
    render() {
        return (
            <div className = 'main Home'>
                <div className="top_img">
                    <img src={require('../img/front.jpg')}  className="header"/>    
                </div> 
               <ThreeNews />
            </div>
        );
    }
}



export default Home 