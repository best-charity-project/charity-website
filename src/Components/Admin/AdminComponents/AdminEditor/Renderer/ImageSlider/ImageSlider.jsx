import React, {Component} from 'react';
import './ImageSlider.css'

class ImageSlider extends Component {
    render() {
        const { block, contentState } = this.props;    
        const entity = contentState.getEntity(block.getEntityAt(0));
        const { src /* width */} = entity.getData();
        let srcArr = src
        return (
            <div className = "slider-container">
                <div className = "slider-ratio">
                    {srcArr.map((link, index) =>
                        <input 
                            type = "radio" 
                            name = "image" 
                            id = {index} 
                            key = {index} 
                            /* checked = {index === 0 ? true : false} */
                        />
                    )}
                    <div className ="slider-inner">
                        <div className ="slider-slides">
                            <div className ="slide">
                                {srcArr.map((link, index) =>
                                    <img 
                                        src = {link} 
                                        alt = '' 
                                        key = {index}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className ="slider-controls">
                        {srcArr.map((link, index) =>
                            <label htmlFor = {index} key = {index} />
                        )}
                    </div>
                </div>
                <div className ="prev" onClick = {this.showPreviousSlide}/* "previousSlide()" */>&#10094;</div>
                <div className ="next" onClick = {this.showNextSlide}/* "nextSlide()" */>&#10095;</div>
            </div>
        )
    }
    showPreviousSlide = () => {}
    showNextSlide = () => {}
}
export default ImageSlider;