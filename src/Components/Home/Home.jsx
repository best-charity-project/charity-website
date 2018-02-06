
import React from 'react';
import './Home.css';
import ThreeNews from './ThreeNews';

class Home extends React.Component {
    render() {
        return (
            <div className = 'home'>
                <div className='home--image-wrapper'>
                    <img src={require('../img/front.jpg')}  className='home--image-big'/>    
                </div> 
               <ThreeNews />
            </div>
        );
    }
}



export default Home 