import { useState, useEffect } from 'react'
import { Form, Text, Number, Button } from './components/form'
import Phonebook from './components/phonebook'
import Notifications from './components/notifications'

import { fetch_people, create_person, remove_person, update_person } from './funcs/db'
import './interface/general.scss'

const App = () => {

    // PEOPLE STATE
    const [people, set_people] = useState([])

    // NOTIFICATIONS STATE
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

            // SUCCESS
            if (response.status === 200) {
                set_people(response.data)
                
                // NOTIFY SUCCESS
                notify({
                    type: 'positive',
                    message: 'Obtained people from db.',
                })

            // ERROR
            } else {
                console.log(response)

                // NOTIFY SUCCESS
                notify({
                    type: 'negative',
                    message: 'Could not fetch people from db.',
                })
            }
        })

    // eslint-disable-next-line
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

    // ATTEMPT TO REMOVE PERSON
    const remove_user = (id) => {
        remove_person(id).then(response => {
            if (response.status === 204) {

                // REDUCE & UPDATE STATE
                const temp = people.filter(entry => entry._id !== id)
                set_people(temp)

                // RENDER ERROR
                notify({
                    type: 'positive',
                    message: 'Removed user.',
                })

                return

            // LOG ODD STATUSES
            } else { console.log(response) }

            // RENDER ERROR
            notify({
                type: 'negative',
                message: 'Could not delete user.',
            })
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

                        // FIND THE OLD INDEX
                        const index = people.indexOf(target)

                        // UPDATE PEOPLE STATE
                        const temp = people;
                        temp[index].number = person.number
                        set_people(temp)
        
                        // RESET INPUT STATES
                        set_input({
                            ...input,
                            name: '',
                            number: ''
                        })
            
                        // PUSH POSITIVE NOTIFICATION
                        notify({
                            type: 'positive',
                            message: 'Updated existing user.',
                        })

                        return
                    
                    // LOG ODD STATUSES
                    } else { console.log(response) }
                })

            // NEW USER, CREATE
            } else {
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

                        return
                    
                    // LOG ODD STATUSES
                    } else { console.log(response) }
                })
            }
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
                    remove={ remove_user }
                />
            </div>
            <div>
                <Form header={ 'add person' } func={ process_user }>
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