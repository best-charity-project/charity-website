import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { server } from "../../../src/api";
import "../FullNews/FullNews.css";
import "./LibraryCard.css";
import { withAlert } from 'react-alert';

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
                this.props.alert.error("Ошибка сервера");
            });
    };

    renderContent() {
        const { data } = this.state;
        if (!data.title) return;

        return <div className="full-news library-card">
            <h3 className="full-news-title library-card-title">{data.title}</h3>
            <a className="library-card-source" href={data.source ? data.source : `https://drive.google.com/uc?id=${data.fileId}&export=download`} target="_blank">{data.source ?  "Источник" : "Скачать"}</a>
            <span
                className='library-card-author'>
                Автор: {data.author}
            </span>
           <p className="library-card-description">{data.description}</p>
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

export default withAlert(LibraryCard);
