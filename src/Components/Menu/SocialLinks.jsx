import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SocialLinks extends Component {
    render() {
        return (
            <div className="social-icons">
                <ul>
                    <li>
                        <Link to="https://www.facebook.com/" />
                    </li>
                    <li>
                        <Link to="https://www.youtube.com/" />
                    </li>
                    <li>
                        <Link to="https://www.instagram.com/?hl=ru" />
                    </li>
                    <li>
                        <Link to="https://vk.com/" />
                    </li>
                </ul>
            </div>
        );
    }
}

export default SocialLinks;
