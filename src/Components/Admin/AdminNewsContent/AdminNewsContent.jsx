import React, {Component} from 'react';
import AdminNewsList from '../AdminNewsList/AdminNewsList';
import Button from '../../../Button/Button';
import './AdminNewsContent.css';

class AdminNewsContent extends Component {
    render() {
        return(
            <div>
                <div className="new-news">
                    <Button 
                        name = "button-admin" 
                        label = {'Создать'} 
                        clickHandler = {this.addNews} 
                    />
                </div>     
                <AdminNewsList />  
            </div>
        )
    }
    addNews = () => {
        
    }
}

export default AdminNewsContent;