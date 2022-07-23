const Button = ({ label, func, id=null }) => { return (
    <input
        type={ 'submit' }
        value={ label }
        onClick={ func }
        className={ 'button' }
        id={ id }
    />
)}

export default Button