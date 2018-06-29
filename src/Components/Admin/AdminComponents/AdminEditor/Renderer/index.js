/* import Embedded from '../../../../../../node_modules/react-draft-wysiwyg/src/renderer/Embedded'; */
import getImageComponent from './Image/Image';
import ImageSlider from './ImageSlider/ImageSlider'

const rendererFunc = (block, config, editorState) => {
    if (block.getType() === 'atomic') {
        const contentState = config.getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        if (entity && entity.type === 'IMAGE') {
            return {
                component: getImageComponent(config),
                editable: false,
            };
        } else if (entity && entity.type === 'EMBEDDED_LINK') {
            return {
               /*  component: Embedded,
                editable: false, */
            };
        } else if (entity && entity.type === 'IMAGE_SLIDER') {
            return {
                component: ImageSlider,
                editable: false,
            };
        }
    }
    return undefined;
};

export default rendererFunc;