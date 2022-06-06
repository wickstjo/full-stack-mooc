import { Fragment, useEffect, useState } from 'react'
import './css/general.scss'
import * as db_api from './funcs/db'

import Notification from './components/notification';
import Header from './components/header';
import { Field } from './components/input';
import List from './components/list';
import Form from './components/form';

const App = () => {

    // LIST OF PEOPLE
    const [people, set_people] = useState([])

    // LOAD PEOPLE FROM JSON DB
    useEffect(() => {
        db_api.fetch_people().then(result => {
            set_people(result)
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

    // NOTIFICATION STATE
    const [notification, set_notification] = useState({
        category: null,
        message: null
    })

    // ADD/UPDATE PERSON
    const process_person = event => {
        event.preventDefault();
        
        // IF INPUT IS NOT EMPTY
        if (input.name.length > 0 && input.number.length > 0) {

            // CHECK IF THE PERSON ALREADY EXISTS
            const filtered = people.filter(person => person.name === input.name)

            // CREATE PERSON OBJECT
            const person = {
                name: input.name,
                number: input.number
            }

            // IF IT DOES, UPDATE PERSONS DETAILS
            if (filtered.length !== 0) {
                
                // FETCH THE PERSONS ID
                const id = filtered[0].id;

                // UPDATE DATA
                db_api.update_person(id, person).then(status => {
                    
                    // IF SOMETHING WENT WRONG, NOTIFY THE USER
                    if (status !== 200) {
                        set_notification({
                            category: 'negative',
                            message: 'COULD NOT UPDATE USER'
                        })
                        return
                    }

                    // OTHERWISE, FIND THE OLD INDEX
                    const index = people.indexOf(filtered[0])

                    // CLONE CURRENT STATE
                    const temp = [ ...people ]
                    
                    // UPDATE PERSON IN TEMP STATE
                    temp[index] = {
                        ...person,
                        id
                    }

                    // UPDATE BOTH STATES
                    set_people(temp);
                    set_input({
                        filter: input.filter,
                        name: '',
                        number: ''
                    })

                    // PUSH NOTIFICATION
                    set_notification({
                        category: 'positive',
                        message: `USER "${ person.name }" DETAILS WERE UPDATED!`
                    })
                })
            
                return
            }

            // OTHERWISE, CREATE PERSON IN DB
            db_api.create_person(person).then(result => {

                // IF SOMETHING WENT WRONG, NOTIFY THE USER
                if (result.status !== 201) {
                    set_notification({
                        category: 'negative',
                        message: 'COULD NOT CREATE USER'
                    })

                    return
                }

                // OTHERWISE, PUSH ASSIGNED ID TO PERSON
                person.id = result.id;

                // UPDATE BOTH STATES
                set_people([
                    ...people,
                    person
                ])

                set_input({
                    filter: input.filter,
                    name: '',
                    number: ''
                })

                // PUSH NOTIFICATION
                set_notification({
                    category: 'positive',
                    message: `USER "${ person.name }" WAS CREATED!`
                })
            })
        }
    }

    // PROCESS REMOVAL
    const remove_person = (id) => {

        // ATTEMPT TO REMOVE THE PERSON FROM THE DB
        db_api.remove_person(id).then(status => {
            
            // IF SOMETHING WENT WRONG, NOTIFY THE USER
            if (status !== 200) {
                set_notification({
                    category: 'negative',
                    message: `COULD NOT REMOVE PERSON WITH ID "${ id }"!`
                })

                return
            }

            // OTHERWISE, FILTER OUT PERSON & UPDATE STATE
            set_people(
                people.filter(person => person.id !== id)
            )

            // PUSH NOTIFICATION
            set_notification({
                category: 'positive',
                message: `PERSON WITH ID "${ id }" REMOVED!`
            })
        
        // PROCESS CRASHES
        }).catch(error => {
            set_notification({
                category: 'negative',
                message: `COULD NOT REMOVE PERSON! (${ error.message })`
            })
        })
    }

    return (
        <Fragment>
            <Notification
                details={ notification }
            />
            <div className={ 'splitter' }>
                <div>
                    <Header text={ 'Phonebook' } />
                    <Field
                        label={ 'Filter by Name' }
                        value={ input.filter }
                        func={
                            event => update_field('filter', event.target.value)
                        }
                    />
                    <List
                        data={ people }
                        keyword={ input.filter }
                        remove={ remove_person }
                    />
                </div>
                <div>
                    <Header text={ 'Add Person' } />
                    <Form
                        trigger={ process_person }
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
                </div>
            </div>
        </Fragment>
    )
}

export default App;