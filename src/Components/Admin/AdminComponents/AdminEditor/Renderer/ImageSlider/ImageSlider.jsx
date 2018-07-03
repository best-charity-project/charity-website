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
            <Carousel>
                {src.map((item, index) =>
                    <div key={index}>
                        <img src={item} />
                    </div>
                )}
            </Carousel>
        )
    }
}
export default ImageSlider;