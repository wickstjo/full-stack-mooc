import Wrapper from './wrapper'
import Form from './form'

import useField from '../hooks/field'
import useResource from '../hooks/resource'

const App = () => {

    // PHONEBOOK DATA
    const [people, actions] = useResource({
        url: 'http://localhost:3001/persons'
    })

    const name = useField({
        placeholder: 'What is the persons name?'
    })

    const phone = useField({
        placeholder: 'What is their number?',
        type: 'number'
    })

    const filter = useField({
        placeholder: 'Filter by name'
    })

    const trigger = () => {

        // PUSH PERSON TO STATE
        actions.create({
            name: name.value,
            number: phone.value
        })

        // RESET FIELDS
        name.reset()
        phone.reset()
    }

    // FILTER PHONEBOOK
    const filtered = people.filter(
        person => person.name.toLowerCase().includes(filter.value.toLowerCase())
    )

    return (
        <div id={ 'main' }>
            <Form
                header={ 'phonebook filter' }
                fields={[ filter ]}
            />
            <Wrapper header={ 'phonebook' }>
                { filtered.map(person =>
                    <div key={ person.id }>
                        <div>{ person.name }</div>
                        <div>{ person.number }</div>
                        <div>
                            <span id={ 'action' } onClick={ () => actions.remove(person.id) }>Remove</span>
                        </div>
                    </div>
                )}
            </Wrapper>
            <Form
                header={ 'add person to phonebook' }
                fields={[ name, phone ]}
                required={[ name, phone ]}
                button={ 'add person' }
                func={ trigger }
            />
        </div>
    )
}

export default App