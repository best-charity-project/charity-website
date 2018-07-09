import React, {Component} from 'react';
import {EditorState} from 'draft-js';
import {Carousel} from 'react-responsive-carousel';

import ModalWindow from '../../../../../ModalWindow/ModalWindow';
import './ImageSlider.css'
import '../../../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css'

class ImageSlider extends Component {
    state = {
        isOpen: false,
        src: []
    }

    componentWillReceiveProps(nextProps) {
        console.log('ImageSlider.componentWillReceiveProps', nextProps)
        const {block, contentState} = nextProps;   
        const entity = contentState.getEntity(block.getEntityAt(0));
        this.setState({src: entity.getData().src})
    }

    componentDidMount() {
        console.log('ImageSlider.componentWillMount', this.props)
        const {block, contentState} = this.props;   
        const entity = contentState.getEntity(block.getEntityAt(0));
        this.setState({src: entity.getData().src})
    }

    render() {
        return (
            <div>
                <Carousel
                    showThumbs = {false}
                    infiniteLoop = {true}
                    statusFormatter = {(current, total) => `${current} из ${total}`}
                    >
                    {this.state.src.map((item, index) =>
                        <div key = {index} onClick = {this.openModalWindow}>
                            <img style = {{backgroundImage: `url(${item})`}} />
                        </div>
                    )}
                </Carousel>
                <div className = {this.state.isOpen ? 'overlay' : 'overlay hidden'} onClick = {this.closeModalWindow}>
                    <div className="modal-element">
                        <ModalWindow 
                            isOpen = {this.state.isOpen}
                            imageArr = {this.state.src}
                            onChangeImageArr = {this.onChangeImageArr}
                            addSlider = {this.editSlider}
                        />
                    </div>
                </div>
            </div> 
        )
    }
    openModalWindow = () => {
        this.setState({isOpen: true})
    }
    closeModalWindow = (e) => {
        if (e.target.className === 'overlay' || ~e.target.className.indexOf('close-window')) {
            e.preventDefault()
            e.stopPropagation()
            this.setState({
                isOpen: false,
                src: []
            })
        } 
    }
    onChangeImageArr = (src) => {
        this.setState({src: src})
    }
    editSlider = (e) => {
        e.preventDefault()
        e.stopPropagation() 
        const {contentState, onChange} = this.props
        let entityKey = this.props.block.getEntityAt(0)
        let newContentState = this.props.contentState.mergeEntityData(
            entityKey,
            {src: this.state.src}
        )

        onChange(EditorState.createWithContent(newContentState))

        this.setState({
            isOpen: false,
            src: []
        })
    }
}
export default ImageSlider;