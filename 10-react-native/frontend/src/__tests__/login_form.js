import { render, fireEvent } from '@testing-library/react-native'
import LoginPrompt from '../components/prompt/windows/login'
import Context from '../context'

describe('Login form', () => {
    it('calls function provided by onSubmit prop after pressing the submit button', () => {

        // MOCK TRIGGER
        const trigger = jest.fn()

        // WRAP LOGIN PROMPT IN CONTEXT
        const { getByPlaceholderText, getByText } = render(
            <Context>
                <LoginPrompt mock_trigger={ trigger } />
            </Context>
        )

        // MOCK CREDENTIALS
        const credentials = {
            username: 'kalle',
            password: 'password'
        }
    
        // WRITE IN CREDENTIALS
        fireEvent.changeText(getByPlaceholderText('What is your username?'), credentials.username)
        fireEvent.changeText(getByPlaceholderText('What is your password?'), credentials.password)
        fireEvent.press(getByText('Login'))
    
        // VERIFY CALL COUNT
        expect(trigger).toHaveBeenCalledTimes(1)
    
        // VERIFY CALL PARAMS
        expect(trigger.mock.calls[0][0]).toEqual(credentials)
    })
})