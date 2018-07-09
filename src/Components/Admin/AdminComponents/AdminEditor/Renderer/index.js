import CustomComponent from './CustomComponent/CustomComponent'

const rendererFunc = (block, onChange) => {
    if (block.getType() === 'atomic') {
        console.log('atomic', block, onChange)
        return {
            component: CustomComponent,
            editable: false,
            props: {
                onChange: onChange
            }
        }
    }
    return undefined
}

export default rendererFunc;