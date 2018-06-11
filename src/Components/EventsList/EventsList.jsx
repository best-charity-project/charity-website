import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import News from '../News/News';
import '../EventsList/EventsList.css';
import { server } from '../../../src/api';

class EventsList extends Component {
    
    render() {
        return (
         <div className={this.props.name}>
            <Masonry className = 'masonry-div'> 
                {(this.props.array)?this.props.array.map(function(el){
                    return <News id = {el._id} 
                                name = {el.title} 
                                text = {el.text} 
                                date = {el.date} 
                                key = {el._id} 
                                event = 'true'
                            />
                }):null}
            </Masonry>
         </div>
        ) 
    }
    

}

export default EventsList;

