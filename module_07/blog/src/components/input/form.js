const Form = ({ header, func, children }) => {

    // SEPARATE INPUTS FROM BUTTON
    const inputs = [ ...children ]
    const button = inputs.pop()

    return (
        <div id={ 'wrapper' }>
            <div id={ 'header' }>{ header }</div>
            <form onSubmit={ func }>
                <div id={ 'content' }>{ inputs }</div>
                { button }
            </form>
        </div>
    )
}

export default Form