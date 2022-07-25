import Button from './button'
import PropTypes from 'prop-types'

const Form = ({ header, func, fields, required, button=false }) => {

    // FORM TRIGGER
    const trigger = async(event) => {
        event.preventDefault()
        func()
    }

    // RESET ALL FIELDS
    const reset_all = () => {
        fields.forEach(field => {
            field.reset()
        })
    }

    return (
        <div id={ 'wrapper' }>
            <div id={ 'header' }>{ header }</div>
            <form onSubmit={ trigger }>
                <div id={ 'form' }>
                    { fields.map((field, index) =>
                        <input
                            { ...field }
                            key={ index }
                            reset={ '' }
                        />
                    )}
                </div>
                { button ?
                    <div id={ 'buttons' }>
                        <Button
                            label={ button }
                            required={ required }
                        />
                        <span id={ 'reset' } onClick={ reset_all }>Reset</span>
                    </div>
                : null }
            </form>
        </div>
    )
}

Form.propTypes = {
    header: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    func: PropTypes.func,
    required: PropTypes.array,
    button: PropTypes.string,
}

export default Form