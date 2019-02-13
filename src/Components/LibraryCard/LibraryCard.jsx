import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { server } from "../../../src/api";
import "../FullNews/FullNews.css";

class LibraryCard extends Component {
    state = {
        data: {}
    };
    componentDidMount() {
        this.getLibraryItem();
    }

    getLibraryItem = () => {
        axios
            .get(`${server}/api/materials/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    data: response.data.material
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    renderContent() {
        const { data } = this.state;
        if (!data.title) return;

        return <div className="full-news">
            <h3 className="full-news-title">{data.title}</h3>
            <a href={data.url}>{data.category.toLowerCase() === "видео" ? "Смотреть" : "Скачать"}</a>
            <span
                className='full-news-author'>
                Автор: {data.author}
            </span>
           <p>{data.description}</p>
        </div>
    }

    render() {
        return (
            <div className="client-news">
                <div className="full-news-container">
                    <div className="aside-and-text-full-news">
                        <div className="aside-full-news">
                            <NavLink to="/library">Библиотека</NavLink>
                        </div>
                        <div className="full-news-list-container">
                            {this.renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LibraryCard;
