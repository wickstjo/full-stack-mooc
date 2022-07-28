import Wrapper from './wrapper'
import Form from './form'

import useField from '../hooks/field'
import useResource from '../hooks/resource'

const App = () => {

    // PHONEBOOK DATA
    const [people, actions] = useResource({
        url: `${ process.env.REACT_APP_BACKEND_URI }/persons`
    })

    const name = useField({
        placeholder: 'What is the persons name?'
    })

    const phone = useField({
        placeholder: 'What is their number?',
    })

    const filter = useField({
        placeholder: 'Filter by name'
    })

    const trigger = async () => {

        // PUSH PERSON TO STATE
        const result = await actions.create({
            name: name.value,
            number: phone.value
        })

        // RESET FIELDS
        if (result) {
            name.reset()
            phone.reset()
        }
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
                required={[  ]}
                button={ 'add person' }
                func={ trigger }
            />
        </div>
    )
}

export default App