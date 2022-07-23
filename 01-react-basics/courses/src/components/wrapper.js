const Wrapper = ({ header, children }) => { return (
    <div id={ 'main' }>
        <div id={ 'wrapper' }>
            <div id={ 'header' }>{ header }</div>
            <div id={ 'content' }>
                { children }
            </div>
        </div>
    </div>
)}

export default Wrapper