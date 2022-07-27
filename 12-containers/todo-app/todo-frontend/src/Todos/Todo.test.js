import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import event from '@testing-library/user-event'
import Todo from './Todo'

const mock_todo = {
    text: 'foo',
    done: false,
    id: '123'
}

const mock_actions = {
    complete: jest.fn(),
    remove: jest.fn(),
}

const create_container = () => {
    return render(
        <Todo
            item={ mock_todo }
            remove={ mock_actions.remove }
            complete={ mock_actions.complete }
        />
    ).container
}

test('Task text renders correctly', async () => {
    const container = create_container()

    const task = container.querySelector('#task')
    expect(task).toBeDefined()
    expect(task).toHaveTextContent(mock_todo.text)
})

test('Status text renders correctly', async () => {
    const container = create_container()

    const status = container.querySelector('#status')
    expect(status).toBeDefined()
    expect(status).toHaveTextContent('This todo is not done')
})

test('Remove button renders correctly', async () => {
    const container = create_container()

    const remove = container.querySelector('#remove')
    expect(remove).toBeDefined()
    expect(remove).toHaveTextContent('Delete')
})

test('Complete button renders correctly', async () => {
    const container = create_container()
    
    const complete = container.querySelector('#complete')
    expect(complete).toBeDefined()
    expect(complete).toHaveTextContent('Set as done')
})