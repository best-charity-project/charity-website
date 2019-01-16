import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import News from '../News/News';
import '../EventsList/EventsList.css';

class EventsList extends Component {
    
    render() {
        return (
         <div className = {this.props.name}>
            <Masonry className = 'masonry-div'> 
                {(this.props.array)?this.props.array.map(function(event, index){
                    return <News event = {event} key={event.title + index} />
                }) : null}
            </Masonry>
         </div>
        ) 
    }  
}

export default EventsList;

