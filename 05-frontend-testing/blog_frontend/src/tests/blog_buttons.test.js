import { render, event } from './test_suite'
import Actions from '../components/blogs/actions'
import Redux from '../redux'

const mock_blog = {
    title: 'Microservices and the first law of distributed objects',
    author: 'Martin Fowler',
    url: 'https://www.youtube.com/watch?v=zg2Y5rxlg-M',
    likes: 12,
    id: '62ab20fd6ed0d0330c8afa10',
    user: {
        username: 'foo',
        id: '62a9ccbb6ed0d0330c8af7bd'
    }
}

const mock_actions = {
    like: jest.fn(),
    dislike: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
}

const create_container = () => {
    return render(
        <Redux>
            <Actions
                blog={ mock_blog }
                mock_actions={ mock_actions }
            />
        </Redux>
    ).container
}

test('Blog like button calls func correctly', async () => {

    // FIND THE LIKE BUTTON
    const like_button = create_container().querySelector('#actions #like')
    expect(like_button).toBeDefined()

    // CLICK AND VERIFY MOCK FUNCTION CALLS X TIMES
    for (let x=0; x < 5; x++) {
        event.click(like_button)
        expect(mock_actions.like.mock.calls).toHaveLength(x+1)
        expect(mock_actions.like.mock.calls[x][0]).toBe(mock_blog.id)
    }
})

test('Blog dislike button calls func correctly', async () => {

    // FIND THE LIKE BUTTON
    const dislike_button = create_container().querySelector('#actions #dislike')
    expect(dislike_button).toBeDefined()

    // CLICK AND VERIFY MOCK FUNCTION CALLS X TIMES
    for (let x=0; x < 5; x++) {
        event.click(dislike_button)
        expect(mock_actions.dislike.mock.calls).toHaveLength(x+1)
        expect(mock_actions.dislike.mock.calls[x][0]).toBe(mock_blog.id)
    }
})

test('Blog update button calls func correctly', async () => {

    // FIND THE LIKE BUTTON
    const update_button = create_container().querySelector('#actions #update')
    expect(update_button).toBeDefined()

    // CLICK AND VERIFY MOCK FUNCTION CALLS X TIMES
    for (let x=0; x < 5; x++) {
        event.click(update_button)
        expect(mock_actions.update.mock.calls).toHaveLength(x+1)
        expect(mock_actions.update.mock.calls[x][0]).toBe(mock_blog)
    }
})

test('Blog remove button calls func correctly', async () => {

    // FIND THE LIKE BUTTON
    const remove_button = create_container().querySelector('#actions #remove')
    expect(remove_button).toBeDefined()

    // CLICK AND VERIFY MOCK FUNCTION CALLS X TIMES
    for (let x=0; x < 5; x++) {
        event.click(remove_button)
        expect(mock_actions.remove.mock.calls).toHaveLength(x+1)
        expect(mock_actions.remove.mock.calls[x][0]).toBe(mock_blog.id)
    }
})