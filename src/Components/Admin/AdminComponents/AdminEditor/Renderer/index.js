import CustomComponent from './CustomComponent/CustomComponent'

const rendererFunc = (block, onChange, editorRef, isAdmin) => {
    if (block.getType() === 'atomic') {
        return {
            component: CustomComponent,
            editable: false,
            props: {
                onChange: onChange,
                isAdmin: isAdmin ? true : false,
                editorRef: editorRef,
                deletedImages: deletedImages
            },  
        }
    }
    return undefined
}

export default rendererFunc;