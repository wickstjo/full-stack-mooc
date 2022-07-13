import useTransition from '../hooks/transition'

const Wrapper = ({ header, children }) => {

    // CSS TRANSITION
    const style = useTransition()
    
    return (
        <div id={ 'wrapper' } style={ style }>
            <div id={ 'header' }>{ header }</div>
            <div id={ 'content' }>
                { children }
            </div>
        </div>
    )
}

export default Wrapper