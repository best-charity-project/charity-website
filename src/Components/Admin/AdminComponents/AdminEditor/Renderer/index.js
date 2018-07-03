import CustomComponent from './CustomComponent/CustomComponent'
/* 
const rendererFunc = (block, config, editorState) => {
    if (block.getType() === 'atomic') {
        console.log(111, block)
        console.log(222, block.getEntityAt(0))
        console.log(333, block.getData())
        if (config && editorState) {
            const contentState = config.getEditorState().getCurrentContent();
            const entity = contentState.getEntity(block.getEntityAt(0));
            if (entity && entity.type === 'IMAGE') {
                return {
                    component: getImageComponent(config),
                    editable: false,
                };
            } else if (entity && entity.type === 'EMBEDDED_LINK') {
                return {
                    component: Embedded,
                    editable: false, 
                };
            } else if (entity && entity.type === 'IMAGE_SLIDER') {
                return {
                    component: ImageSlider,
                    editable: false
                };
            }
        }
    }
    return undefined;
}; */

const rendererFunc = (block) => {
    if (block.getType() === 'atomic') {
        console.log('atomic')
        return {
            component: CustomComponent,
            editable: false
        }
    }
    return undefined
}

export default rendererFunc;