import { Field, Submit } from './input';

const Form = ({ trigger, update, fields }) => { return (
    <form onSubmit={ trigger }>
        { fields.map(field =>
            <Field
                key={ field.id }
                label={ field.label }
                value={ field.value }
                func={
                    event => update(field.id, event.target.value)
                }
            />
        )}
        <Submit label={ 'Add' } />
    </form>
)}

export default Form;