import { Fragment, useState } from 'react'
import Container from '../components/container'
import Header from '../components/header'
import Errors from '../components/errors'

import Field from '../components/inputs/field'
import Button from '../components/inputs/button'
import useField from '../components/inputs/hook'

export default () => {

    // ERROR STATE
    const [errors, set_errors] = useState([])

    // USERNAME FIELD
    const username = useField({
        placeholder: 'Username'
    })

    // PASSWORD FIELD
    const password = useField({
        placeholder: 'Password'
    })

    const trigger = () => {
        
        // ERROR CONTAINER
        const container = []

        if (username.value === '') {
            container.push('A username is required.')
        }

        if (password.value === '') {
            container.push('A password is required.')
        }

        // IF THERE ARE ERRORS, RENDER THEM
        if (container.length > 0) {
            return set_errors(container)
        }

        // OTHERWISE, TRIGGER FORM
        console.log('TRIGGER')
    }

    return (
        <Fragment>
            <Container>
                <Header text={ 'Login User' } />
                <Field { ...username } />
                <Field { ...password } />
                <Button
                    label={ 'Login' }
                    func={ trigger }
                />
            </Container>
            <Errors errors={ errors } />
        </Fragment>
    )
}