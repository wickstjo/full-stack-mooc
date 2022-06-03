import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

import Header from './Header';
import { Field } from './Input';
import List from './List';
import Form from './Form';

const App = () => {

    // LIST OF PEOPLE
    const [people, set_people] = useState([])

    // LOAD PEOPLE FROM JSON DB
    useEffect(() => {
        axios.get('http://localhost:3001/persons').then(response => {
            set_people(response.data)
        })
    }, [])

    // INPUT STATES
    const [input, set_input] = useState({
        name: '',
        number: '',
        filter: ''
    })

    // UPDATE INPUT STATES
    const update_field = (category, value) => {
        set_input({
            ...input,
            [category]: value
        })
    }

    // ADD PERSON
    const add_person = event => {
        event.preventDefault();
        
        // IF INPUT IS NOT EMPTY
        if (input.name.length > 0 && input.number.length > 0) {

            // VERIFY WHETHER THE NAME ALREADY EXISTS
            const exists = people.filter(person => person.name === input.name).length === 0 ? false : true;

            // IF IT DOES, ALERT & BREAK EARLY
            if (exists) {
                alert(`${ input.name } already exists!`)
                return
            }

            // PUSH NEW ENTRY
            people.push({
                ...input,
                id: people.length +1
            })

            // UPDATE BOTH STATES
            set_people(people)
            set_input({
                ...input,
                name: '',
                number: ''
            })
        }
    }

    return (
        <Fragment>
            <Header text={ 'Phonebook' } />
            <Field
                label={ 'Filter by Name' }
                value={ input.filter }
                func={
                    event => update_field('filter', event.target.value)
                }
            />
            <Header text={ 'Add Person' } />
            <Form
                trigger={ add_person }
                update={ update_field }
                fields={[{
                    id: 'name',
                    label: 'what is their name?',
                    value: input.name
                }, {
                    id: 'number',
                    label: 'what is their number?',
                    value: input.number
                }]}
            />
            <Header text={ 'Numbers' } />
            <List
                data={ people }
                keyword={ input.filter }
            />
        </Fragment>
    )
}

export default App;