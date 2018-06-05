import React, {Component} from 'react';
import Masonry from 'react-masonry-component';
import New from '../News/News';
import '../NewsList/NewsList.css';
import { server } from '../../../src/api';

class NewsList extends Component {
    
    render() {
        return (
         <div className={this.props.name}>
            <Masonry className = 'masonry-div'> 
                {(this.props.array)?this.props.array.map(function(el){
                    return <New id = {el._id} name = {el.title} text = {el.shortText} date = {el.date} key = {el._id} img = {el.image}/>
                }):null}
            </Masonry>
         </div>
        ) 
    }
    

}

export default NewsList;

