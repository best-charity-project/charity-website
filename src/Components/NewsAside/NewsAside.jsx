import React, {Component} from 'react';
import './NewsAside.css';

class NewsAside extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem : '',
            newsSources: []
        }
    }
    componentDidMount(){
        this.setState({activeItem : 'все', newsSources: ['все','организаторы', 'спонсоры','активисты','волонтеры']})
    }
    getCurrentLink = (e) => {
        let currentLink = e.target;
        this.setState({activeItem :e.target.innerText.toLowerCase()})
    }
    render() {
        const {activeItem} = this.state;
        return (
            <div className="news-aside">
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

export default NewsAside;