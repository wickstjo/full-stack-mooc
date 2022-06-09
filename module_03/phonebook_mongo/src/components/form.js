import Header from './header.js'

const Form = ({ header, children, func }) => { return (
    <div className={ 'wrapper' }>
        <Header text={ header } />
        <div className={ 'content' }>
            <form onSubmit={ func }>
                { children }
            </form>
        </div>
    </div>
)}

const Text = ({ label, value, func }) => { return (
    <input
        value={ value }
        placeholder={ label }
        onChange={ func }
        type={ 'text' }
    />
)}

const Number = ({ label, value, func }) => { return (
    <input
        value={ value }
        placeholder={ label }
        onChange={ func }
        type={ 'number' }
    />
)}

const Button = ({ label }) => { return (
    <input
        value={ label }
        type={ 'submit' }
        className={ 'submit' }
    />
)}

export {
    Form,
    Text,
    Number,
    Button
}