import { render, event, log } from '../funcs/test_suite'
import App from '../components/app/index'

const mock_actions = {
    like: jest.fn()
}

// CREATE CONTAINER
beforeEach(() => {
    render(
        <App />
    )
})

test('Header text renders correctly', async () => {
    
    // CLICK THE HEADER
    const login_button = container.querySelector('#menu #login')
    expect(login_button).toBeDefined()

    event.click(login_button)
    // log()
})