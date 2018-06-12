import React, {Component} from 'react';
import './EventsAside.css';

class EventsAside extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem : '',
            newsSources: []
        }
    }
    componentDidMount(){
        this.setState({activeItem : 'все', newsSources: this.props.listSourse})
    }
    getCurrentLink = (e) => {
        let currentLink = e.target;
        this.setState({activeItem :e.target.innerText.toLowerCase()}, () => {
            this.props.getCurrentSourse(this.state.activeItem)
        });        
    }
    render() {
        const {activeItem} = this.state;
        return (
            <div className="events-aside">
              <ul className = 'link-news' onClick = {this.getCurrentLink}>
                    {this.state.newsSources.map((el,index)=> {
                        if(activeItem === el){
                            return <li className ='active-link-news' key = {index}>{el}</li>
                        }                      
                        return <li key = {index}>{el}</li>                    
                    
                    })}
                </ul>
            </div>
        ) 
    }
}

export default EventsAside;