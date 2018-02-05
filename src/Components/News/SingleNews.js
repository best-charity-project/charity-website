import React from 'react';
import './SingleNews';

class SingleNews extends React.Component {
    render() {
        const {className, title, text} = this.props;
       
        return (
           <div className = {className}>
               <h2 className='title'>{title}</h2>
               <p className='text'>{text}</p>
            </div>   
          
       );
   }
}

export default SingleNews