import React, {Component} from 'react';
import './NewsAside.css';

class NewsAside extends Component {
    state = {
        activeItem: 'Все',
        newsSources: ['Все', 'Организаторы', 'Спонсоры', 'Активисты', 'Волонтеры']
    }
    render() {
        return (
            <div className="news-aside">
                <ul>
                    {this.state.newsSources.map((item) =>
                    <li className={(this.state.activeItem === item) ? "active" : null}>item</li>)}
                </ul>
            </div>
        ) 
    }
}

export default NewsAside;