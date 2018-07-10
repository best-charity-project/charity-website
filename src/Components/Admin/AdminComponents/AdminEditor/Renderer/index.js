import CustomComponent from './CustomComponent/CustomComponent'

const rendererFunc = (block, onChange, isAdmin) => {
    if (block.getType() === 'atomic') {
        console.log('atomic', isAdmin)
        return {
            component: CustomComponent,
            editable: false,
            props: {
                onChange: onChange,
                isAdmin: isAdmin ? true : false
            }, 
        }
    }
    return undefined
}

export default rendererFunc;