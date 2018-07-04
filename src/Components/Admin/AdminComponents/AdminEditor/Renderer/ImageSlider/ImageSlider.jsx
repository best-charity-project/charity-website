import React, {Component} from 'react';
import './ImageSlider.css'
import { Carousel } from 'react-responsive-carousel'
import '../../../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css'

class ImageSlider extends Component {
    render() {
        const {block, contentState} = this.props;   
        const entity = contentState.getEntity(block.getEntityAt(0));
        const {src} = entity.getData();
        return (
            <Carousel
                showThumbs = {false}
                infiniteLoop = {true}
                statusFormatter = {(current, total) => `${current} из ${total}`}
                >
                {src.map((item, index) =>
                    <div key = {index}>
                        <img style = {{backgroundImage: `url(${item})`}} />
                    </div>
                )}
            </Carousel>
        )
    }
}
export default ImageSlider;