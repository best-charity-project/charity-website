import React, {Component} from 'react';
import NewsDate from '../NewsDate/NewsDate';
import NewsImage from '../NewsImage/NewsImage';
import NewsText from '../NewsText/NewsText';
import './News.css';

class News extends Component {
    render() {
        return (
            <div className="news">
                <NewsDate />
                <NewsImage image= {'https://www.google.by/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'} />
                <NewsText title = {'gkjnbfgjkbn'} text = {'hvbejfvhberk'} />
            </div>
        ) 
    }
}

export default News;