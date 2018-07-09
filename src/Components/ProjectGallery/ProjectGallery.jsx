import React, { Component } from "react";
import ReactPlayer from 'react-player';


export default class ProjectGallery extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            showVideo: false,
            showImage: false,
            link: ''
        };
    }

    showVideoModal = (e) => {
        this.setState({
            show: true,
            showVideo: true,
            link: e
        });

    };


    showImageModal = (e) => {
        this.setState({
            show: true,
            showImage: true,
            link: e
        });
    };

    hideModal = () => {
        this.setState({
            show: false,
            link: ''
        });
    }; 



    render() {
        let videos = this.props.content.mediaVideoArray
        let image = this.props.content.mediaImageArray
        let totalArray = [...videos,...image]
        return (
            <div>
                {this.state.show ? <Modal show={this.state.show} handleClose={this.hideModal}>
                {this.state.showVideo ? <ReactPlayer url={this.state.link} controls /> : <img src={this.state.link} alt=""/>}
                </Modal> : null}
                <div className="gallery">
                    {totalArray.map((item, i) => {
                    return item.includes('png') ? <img className="image-items" key={i} src={item} onClick={this.showImageModal}></img>
                            : <div className="video-items" key={i} onClick={() => this.showVideoModal(item)}>i am video</div>    
                    })}
                </div>
            </div>
        );
    }

}

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button onClick={handleClose}>X</button>            
            </section>
        </div>
    );
};
