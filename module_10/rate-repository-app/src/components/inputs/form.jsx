import { Fragment, useState, useEffect } from 'react'
import Field from './field'
import Button from './button'
import Header from './header'

export default ({ fields, func, button, required, header }) => {

    // BUTTON ACTIVE STATUS
    const [status, set_status] = useState(true)

    // VALIDATE REQUIRED FIELDS
    useEffect(() => {
        let result = false;

        required.map(item => {
            if (item.value === '') {
                result = true
            }
        })

        set_status(result)
    }, [required])

    return (
        <Fragment>
            <Header text={ header } />
            { fields.map((field, index) =>
                <Field key={ index } { ...field } />
            )}
            <Button
                label={ button }
                func={ func }
                disabled={ status }
            />
        </Fragment>
    )
}