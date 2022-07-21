import { render, fireEvent } from '@testing-library/react-native'
import Form from '../components/inputs/form'
import useField from '../hooks/field'

const Wrapper = ({ mock_trigger }) => {

    const username = useField({
        placeholder: 'Username'
    })

    const password = useField({
        placeholder: 'Password'
    })
    
    return (
        <Form
            fields={[ username, password ]}
            required={[ username, password ]}
            button={ 'Login' }
            func={() => {
                mock_trigger({
                    username: username.value,
                    password: password.value,
                })
            }}
        />
    )
}

describe('Login form', () => {
    it('calls function provided by onSubmit prop after pressing the submit button', () => {

        // EVENTS
        const trigger = jest.fn()

        const { getByPlaceholderText, getByText } = render(
            <Wrapper mock_trigger={ trigger } />
        )

        // MOCK CREDENTIALS
        const credentials = {
            username: 'kalle',
            password: 'password'
        }
    
        // WRITE IN CREDENTIALS
        fireEvent.changeText(getByPlaceholderText('Username'), credentials.username)
        fireEvent.changeText(getByPlaceholderText('Password'), credentials.password)
        fireEvent.press(getByText('Login'))
    
        // VERIFY CALL COUNT
        expect(trigger).toHaveBeenCalledTimes(1)
    
        // VERIFY CALL PARAMS
        expect(trigger.mock.calls[0][0]).toEqual(credentials)
    })
})