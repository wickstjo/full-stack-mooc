import { useState, useEffect } from 'react'
import { Form, Text, Number, Button } from './components/form'
import Phonebook from './components/phonebook'
import Notifications from './components/notifications'

import { fetch_people, create_person } from './funcs/db'
import './interface/general.scss'

const App = () => {

    // LIST OF PEOPLE
    const [people, set_people] = useState([])

    // LIST OF NOTIFICATIONS
    const [notifications, set_notifications] = useState([])

    // INPUT STATES
    const [input, set_input] = useState({
        filter: '',
        name: '',
        number: ''
    })

    // ON LOAD, FETCH ALL PEOPLE
    useEffect(() => {
        fetch_people().then(response => {
            if (response.status === 200) {
                set_people(response.data)
            } else {
                console.log(response)
            }
        })
    }, [])

    // UPDATE INPUT STATES
    const update_field = (category, value) => {
        set_input({
            ...input,
            [category]: value
        })
    }

    // CREATE NOTIFICATION
    const notify = (params) => {
        set_notifications([
            ...notifications, {
                type: params.type,
                message: params.message,
                id: Date.now() * Math.random()
            }
        ])
    }

    // ATTEMPT TO CREATE A NEW USER
    const create_user = (event) => {
        event.preventDefault();
        
        // IF BOTH FIELDS ARE FILLED
        if (input.name.length !== '' && input.number !== '') {

            // CREATE THE PERSON
            const person = {
                name: input.name,
                number: input.number
            }

            // CREATE PERSON WITH INPUT
            create_person(person).then(response => {
                if (response.status === 201) {

                    // UPDATE PEOPLE STATE
                    set_people([
                        ...people,
                        response.data
                    ])
    
                    // RESET INPUT STATES
                    set_input({
                        ...input,
                        name: '',
                        number: ''
                    })
        
                    // PUSH POSITIVE NOTIFICATION
                    notify({
                        type: 'positive',
                        message: 'Created new user.',
                    })
                
                // LOG ODD STATUSES
                } else { console.log(response) }

                return
            })
        }

        // OTHERWISE, PRESENT ERROR
        notify({
            type: 'negative',
            message: 'Could not create user.',
        })
    }

    return (
        <div className={ 'container' }>
            <div>
                <Form header={ 'Filter Results' }>
                    <Text
                        label={ 'Filter people by name' }
                        value={ input.filter }
                        func={
                            event => update_field('filter', event.target.value)
                        }
                    />
                </Form>
                <Phonebook
                    header={ 'phonebook' }
                    data={ people }
                    keyword={ input.filter }
                />
            </div>
            <div>
                <Form header={ 'add person' } func={ create_user }>
                    <Text
                        label={ 'What is their name?' }
                        value={ input.name }
                        func={
                            event => update_field('name', event.target.value)
                        }
                    />
                    <Number
                        label={ 'What is their number?' }
                        value={ input.number }
                        func={
                            event => update_field('number', event.target.value)
                        }
                    />
                    <Button label={ 'Create User' } />
                </Form>
                <Notifications
                    header={ 'notifications' }
                    data={ notifications }
                />
            </div>
        </div>
    )
}

export default App;