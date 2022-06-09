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
    <div>
        <input
            value={ value }
            placeholder={ label }
            onChange={ func }
            type={ 'text' }
        />
    </div>
)}

const Number = ({ label, value, func }) => { return (
    <div>
        <input
            value={ value }
            placeholder={ label }
            onChange={ func }
            type={ 'number' }
        />
    </div>
)}

const Button = ({ label }) => { return (
    <div>
        <input
            value={ label }
            type={ 'submit' }
            className={ 'submit' }
        />
    </div>
)}

export {
    Form,
    Text,
    Number,
    Button
}