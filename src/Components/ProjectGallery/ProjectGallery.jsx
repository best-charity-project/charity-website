import React, { Component } from "react";
import ReactPlayer from 'react-player';


export default class ProjectGallery extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
    }

    render() {
        return (
            <div className="gallery">
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    {this.props.content.video === "" ? null : <ReactPlayer url={this.props.content.video} controls /> }
                </Modal>
                <div className="video-placeholder" onClick={this.showModal}>
                </div>
                {this.props.content.mediaImageArray.map((item, i) => {
                    <img src={item} key={i}/>
                })}
            </div>
        );
    }

    showModal = () => {
        this.setState({
            show: true
        });
    };

    hideModal = () => {
        this.setState({
            show: false
        })
    }
}
    const Modal = ({ handleClose, show, children }) => {
        const showHideClassName = show ? "modal display-block" : "modal display-none";
    
        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    {children}
                    <button onClick={handleClose}>close</button>            
                </section>
            </div>
        );
    };