import { render, event } from './test_suite'
import Redux from '../redux'

import Login from '../components/prompt/windows/login'
import Register from '../components/prompt/windows/register'
import CreateBlog from '../components/prompt/windows/create_blog'

const mock_actions = {
    login: jest.fn(),
    register: jest.fn(),
    create_blog: jest.fn(),
}

test('Login user form works correctly', async () => {

    const container = render(
        <Redux>
            <Login
                mock_trigger={ mock_actions.login }
            />
        </Redux>
    ).container

    const username_field = container.querySelector('#login_username')
    const password_field = container.querySelector('#login_password')
    const trigger_button = container.querySelector('#trigger')

    expect(username_field).toBeDefined()
    expect(password_field).toBeDefined()
    expect(trigger_button).toBeDefined()

    const mock_user = {
        username: 'foobar',
        password: 'bizbaz'
    }

    event.type(username_field, mock_user.username)
    event.type(password_field, mock_user.password)
    event.click(trigger_button)

    expect(mock_actions.login.mock.calls).toHaveLength(1)
    expect(mock_actions.login.mock.calls[0][0]).toStrictEqual(mock_user)
})

test('Register user form works correctly with name', async () => {

    const container = render(
        <Redux>
            <Register
                mock_trigger={ mock_actions.register }
            />
        </Redux>
    ).container

    const username_field = container.querySelector('#register_username')
    const name_field = container.querySelector('#register_name')
    const password_field = container.querySelector('#register_password')
    const trigger_button = container.querySelector('#trigger')

    expect(username_field).toBeDefined()
    expect(name_field).toBeDefined()
    expect(password_field).toBeDefined()
    expect(trigger_button).toBeDefined()

    const mock_user = {
        username: 'foobar',
        name: 'eyylmao',
        password: 'bizbaz'
    }

    event.type(username_field, mock_user.username)
    event.type(name_field, mock_user.name)
    event.type(password_field, mock_user.password)
    event.click(trigger_button)

    expect(mock_actions.register.mock.calls).toHaveLength(1)
    expect(mock_actions.register.mock.calls[0][0]).toStrictEqual(mock_user)
})

test('Register user form works correctly without name', async () => {

    const container = render(
        <Redux>
            <Register
                mock_trigger={ mock_actions.register }
            />
        </Redux>
    ).container

    const username_field = container.querySelector('#register_username')
    const password_field = container.querySelector('#register_password')
    const trigger_button = container.querySelector('#trigger')

    expect(username_field).toBeDefined()
    expect(password_field).toBeDefined()
    expect(trigger_button).toBeDefined()

    const mock_user = {
        username: 'foobar',
        password: 'bizbaz'
    }

    event.type(username_field, mock_user.username)
    event.type(password_field, mock_user.password)
    event.click(trigger_button)

    expect(mock_actions.register.mock.calls).toHaveLength(1)
    expect(mock_actions.register.mock.calls[0][0]).toStrictEqual(mock_user)
})

test('Crete blog form works correctly without likes', async () => {

    const container = render(
        <Redux>
            <CreateBlog
                mock_trigger={ mock_actions.create_blog }
            />
        </Redux>
    ).container

    const title_field = container.querySelector('#create_title')
    const author_field = container.querySelector('#create_author')
    const url_field = container.querySelector('#create_url')
    const trigger_button = container.querySelector('#trigger')

    expect(title_field).toBeDefined()
    expect(author_field).toBeDefined()
    expect(url_field).toBeDefined()
    expect(trigger_button).toBeDefined()

    const mock_blog = {
        title: 'foobar',
        author: 'bizbaz',
        url: 'bizbaz',
    }

    event.type(title_field, mock_blog.title)
    event.type(author_field, mock_blog.author)
    event.type(url_field, mock_blog.url)
    event.click(trigger_button)

    expect(mock_actions.create_blog.mock.calls).toHaveLength(1)
    expect(mock_actions.create_blog.mock.calls[0][0]).toStrictEqual(mock_blog)
})

test('Crete blog form works correctly with likes', async () => {

    const container = render(
        <Redux>
            <CreateBlog
                mock_trigger={ mock_actions.create_blog }
            />
        </Redux>
    ).container

    const title_field = container.querySelector('#create_title')
    const author_field = container.querySelector('#create_author')
    const url_field = container.querySelector('#create_url')
    const likes_field = container.querySelector('#create_likes')
    const trigger_button = container.querySelector('#trigger')

    expect(title_field).toBeDefined()
    expect(author_field).toBeDefined()
    expect(url_field).toBeDefined()
    expect(likes_field).toBeDefined()
    expect(trigger_button).toBeDefined()

    const mock_blog = {
        title: 'foobar',
        author: 'bizbaz',
        url: 'bizbaz',
        likes: '15'
    }

    event.type(title_field, mock_blog.title)
    event.type(author_field, mock_blog.author)
    event.type(url_field, mock_blog.url)
    event.type(likes_field, mock_blog.likes)
    event.click(trigger_button)

    expect(mock_actions.create_blog.mock.calls).toHaveLength(1)
    expect(mock_actions.create_blog.mock.calls[0][0]).toStrictEqual(mock_blog)
})