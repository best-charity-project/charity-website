import CustomComponent from './CustomComponent/CustomComponent'

const rendererFunc = (block, onChange, editorRef, getDeletedImages, isAdmin) => {
    if (block.getType() === 'atomic') {
        return {
            component: CustomComponent,
            editable: false,
            props: {
                onChange: onChange,
                isAdmin: isAdmin ? true : false,
                editorRef: editorRef,
                getDeletedImages: getDeletedImages
            },  
        }
    }
    return undefined
}

export default rendererFunc;