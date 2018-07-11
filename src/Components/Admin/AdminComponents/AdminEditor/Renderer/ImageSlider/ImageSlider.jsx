import React, {Component} from 'react';
import {EditorState, SelectionState, Modifier} from 'draft-js';
import {Carousel} from 'react-responsive-carousel';

import ModalWindow from '../../../../../ModalWindow/ModalWindow';
import Button from '../../../../../Button/Button';
import './ImageSlider.css';
import '../../../../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

class ImageSlider extends Component {
    state = {
        isOpen: false,
        imageArr: []
    }

    componentWillReceiveProps(nextProps) {
        // console.log('ImageSlider.componentWillReceiveProps', nextProps)
        const {block, contentState} = nextProps;   
        const entity = contentState.getEntity(block.getEntityAt(0));
        this.setState({imageArr: entity.getData().src})
    }

    componentDidMount() {
        // console.log('ImageSlider.componentWillMount', this.props)
        const {block, contentState} = this.props;   
        const entity = contentState.getEntity(block.getEntityAt(0));
        this.setState({imageArr: entity.getData().src})

        document.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) this.setState({
                isOpen: false,
                imageArr: entity.getData().src
            });
        });
    }

    render() {
        console.log('fjtvnhfogbnvortnbvogr')
        return (
            <div>
                <Carousel
                    showThumbs = {false}
                    infiniteLoop = {true}
                    statusFormatter = {(current, total) => `${current} из ${total}`}
                    >
                    {this.state.imageArr.map((item, index) =>
                        <div key = {index} >
                            {this.props.isAdmin ? 
                                <Button 
                                    name = "delete-slider"
                                    clickHandler = {this.deleteSlider}
                                    label = "Удалить"
                                /> :
                                null
                            }
                            <div onClick = {this.openModalWindow}>
                                <img style = {{backgroundImage: `url(${item})`}} />
                            </div>
                        </div>
                    )}
                </Carousel>
                <div className = {this.state.isOpen ? 'overlay' : 'overlay hidden'} onClick = {this.closeModalWindow}>
                    <div className="modal-element">
                        <ModalWindow 
                            isOpen = {this.state.isOpen}
                            onChangeImageArr = {this.onChangeImageArr}
                            addSlider = {this.editSlider}
                            getUrl = {this.getUrl}
                            imageArr = {this.state.imageArr}
                            editorRef = {this.props.editorRef}
                        />
                    </div>
                </div>
            </div> 
        )
    }
    openModalWindow = () => {
        if (this.props.isAdmin) { 
            this.setState({isOpen: true}) 
            // this.props.editorRef.focus()
        }
    }
    closeModalWindow = (e) => {
        if (e.target.className === 'overlay' || ~e.target.className.indexOf('close-window')) {
            this.setState({
                isOpen: false,
                imageArr: []
            })
        } 
    }
    onChangeImageArr = (imageArr) => {
        this.setState({imageArr: imageArr})
    }
    editSlider = () => {
        const {contentState, onChange} = this.props
        let entityKey = this.props.block.getEntityAt(0)
        let newContentState = contentState.mergeEntityData(
            entityKey,
            {imageArr: this.state.imageArr}
        )

        onChange(EditorState.createWithContent(newContentState))

        this.setState({
            isOpen: false,
            imageArr: []
        })
    }
    deleteSlider = () => {
        const {contentState, onChange} = this.props

        let blockKey = this.props.block.getKey()
        let targetRange = new SelectionState({
            anchorKey: blockKey,
            anchorOffset: 0,
            focusKey: blockKey,
            focusOffset: this.props.block.getLength()
        })
        let contentWithoutBlock = Modifier.removeRange(contentState, targetRange, 'backward')
        let contentResetBlock = Modifier.setBlockType(contentWithoutBlock, contentWithoutBlock.getSelectionAfter(), 'unstyled')

        onChange(EditorState.createWithContent(contentResetBlock))
        
        this.setState({
            isOpen: false,
            imageArr: []
        })
    }
    getUrl = (imageArr) => {
        this.setState({imageArr: imageArr})
    }
}
export default ImageSlider;