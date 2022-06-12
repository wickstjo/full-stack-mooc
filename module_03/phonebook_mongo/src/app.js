import { useEffect, useReducer } from 'react'
import { Form, Text, Button } from './components/form'
import Phonebook from './components/phonebook'
import Notifications from './components/notifications'

import people_reducer from './reducers/people';
import notif_reducer from './reducers/notifications';
import input_reducer from './reducers/input';

import { fetch_people, create_person, remove_person, update_person } from './funcs/db'
import './interface/general.scss'

const App = () => {

    // PEOPLE STATE
    const [people, set_people] = useReducer(people_reducer, [])

    // NOTIFICATIONS STATE
    const [notifications, notify] = useReducer(notif_reducer, [])

    // INPUT STATES
    const [input, set_input] = useReducer(input_reducer, {
        filter: '',
        name: '',
        number: ''
    })

    // ON LOAD, FETCH ALL PEOPLE
    useEffect(() => {
        fetch_people().then(response => {

            // SUCCESS
            if (response.status === 200) {

                // UPDATE STATE
                set_people({
                    type: 'overwrite',
                    payload: response.data
                })

                // CREATE NOTIFICATION
                notify({
                    type: 'positive',
                    message: 'Obtained people from db.',
                })

            // PARSE UNEXPECTED RESPONSES
            } else { parse_errors(response); }
        })
    }, [])

    // PARSE VALIDATION ERRORS
    const parse_errors = (response) => {
        console.log(response)

        // API UNAVAILABLE
        if (response.status === 0) {
            notify({
                type: 'negative',
                message: 'API is unavailable'
            })

        // OTHERWISE, RENDER ERRORS
        } else {
            response.data.errors.forEach(error => {
                notify({
                    type: 'negative',
                    message: error
                })
            })
        }

    }

    // ATTEMPT TO REMOVE PERSON
    const remove_user = (id) => {
        remove_person(id).then(response => {
            if (response.status === 204) {

                // REDUCE & UPDATE STATE
                set_people({
                    type: 'reduce',
                    payload: id
                })

                // RENDER ERROR
                notify({
                    type: 'positive',
                    message: 'Removed user.',
                })

            // PARSE UNEXPECTED RESPONSES
            } else { parse_errors(response); }
        })
    }

    // ATTEMPT TO CREATE A NEW USER
    const process_user = (event) => {
        event.preventDefault();
        
        // IF BOTH FIELDS ARE FILLED
        if (input.name.length !== '' && input.number !== '') {
    
            // CREATE THE PERSON
            const person = {
                name: input.name,
                number: input.number
            }
    
            // CHECK IF THE PERSON OR NUMBER ALREADY EXISTS
            const target = people.find(
                entry => entry.name === person.name
            )
    
            // USER EXISTS, UPDATE
            if (target) {
                update_person(target._id, person).then(response => {
                    if (response.status === 200) {
    
                        // UPDATE TARGET DATA
                        set_people({
                            type: 'update',
                            target: target,
                            mods: {
                                number: person.number
                            }
                        })
        
                        // RESET INPUT STATES
                        set_input({ type: 'reset' })
            
                        // PUSH POSITIVE NOTIFICATION
                        notify({
                            type: 'positive',
                            message: 'Updated existing user.',
                        })
                    
                    // PARSE UNEXPECTED RESPONSES
                    } else { parse_errors(response); }
                })
    
            // NEW USER, CREATE
            } else {
                create_person(person).then(response => {
                    if (response.status === 201) {
    
                        // ADD PERSON TO STATE
                        set_people({
                            type: 'add',
                            payload: response.data
                        })
        
                        // RESET INPUT STATES
                        set_input({ type: 'reset' })
            
                        // PUSH POSITIVE NOTIFICATION
                        notify({
                            type: 'positive',
                            message: 'Created new user.',
                        })
                    
                    // PARSE UNEXPECTED RESPONSES
                    } else { parse_errors(response); }
                })
            }
        
        // MISSING INPUT
        } else {
            notify({
                type: 'negative',
                message: 'Missing input.',
            })
        }
    }

    // UPDATE INPUT FIELDS
    const update_input = (event, target) => {
        set_input({
            type: 'update',
            target: target,
            payload: event.target.value
        })
    }

    return (
        <div className={ 'container' }>
            <div>
                <Form header={ 'Filter Results' }>
                    <Text
                        label={ 'Filter people by name' }
                        value={ input.filter }
                        func={ event => update_input(event, 'filter') }
                    />
                </Form>
                <Phonebook
                    header={ 'phonebook' }
                    data={ people }
                    keyword={ input.filter }
                    remove={ remove_user }
                />
            </div>
            <div>
                <Form header={ 'add person' } func={ process_user }>
                    <Text
                        label={ 'What is their name?' }
                        value={ input.name }
                        func={ event => update_input(event, 'name') }
                    />
                    <Text
                        label={ 'What is their number?' }
                        value={ input.number }
                        func={ event => update_input(event, 'number') }
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