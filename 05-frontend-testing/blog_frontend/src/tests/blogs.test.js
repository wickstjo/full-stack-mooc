import { render, event } from '../funcs/test_suite'
import Blogs from '../components/blogs/index'

const mock_blogs = [{
    title: 'Microservices and the first law of distributed objects',
    author: 'Martin Fowler',
    url: 'https://www.youtube.com/watch?v=zg2Y5rxlg-M',
    likes: 12,
    id: '62ab20fd6ed0d0330c8afa10',
    user: {
        username: 'foo',
        id: '62a9ccbb6ed0d0330c8af7bd'
    }
}]

const mock_blog = mock_blogs[0]

const mock_actions = {
    like: jest.fn()
}

// CREATE CONTAINER
beforeEach(() => {
    render(
        <Blogs
            data={ mock_blogs }
            user={ 'foo' }
            actions={ mock_actions }
        />
    )
})

test('Header text renders correctly', async () => {
    const selector = container.querySelector('.blog_wrapper #header #title')
    const header_string = `${ mock_blog.title } (${ mock_blog.likes })`

    expect(selector).toBeDefined()
    expect(selector).toHaveTextContent(header_string)
})

test('Blog content is hidden by default', async () => {
    const selector = container.querySelector('.blog_wrapper #content')

    expect(selector).toBeDefined()
    expect(selector).toHaveStyle('display: none')
})

test('Visibility label renders correctly', async () => {
    const selector = container.querySelector('.blog_wrapper #header #visibility')

    expect(selector).toBeDefined()
    expect(selector).toHaveTextContent('show')
})

test('Clicking the header shows contents', async () => {
    
    // CLICK THE HEADER
    const header = container.querySelector('.blog_wrapper #header')
    expect(header).toBeDefined()
    event.click(header)
    
    // CHECK IF THE BLOG CONTENT IS NOW VISIBLE
    const content = container.querySelector('.blog_wrapper #content')
    expect(content).toBeDefined()
    expect(content).toHaveStyle('display: flex')
})

test('Blog contents render correctly', async () => {
    
    // PROPERTIES TO CHECK
    const properties = ['author', 'url', 'likes']

    // COMPARE EACH PROPERTY
    properties.forEach(name => {
        const selector = container.querySelector(`.blog_wrapper #content #${ name }`)
        expect(selector).toBeDefined()
        expect(selector).toHaveTextContent(mock_blog[name])
    })
})

test('Liking a blog makes function calls correctly', async () => {
    
    // FIND THE LIKE BUTTON
    const like_button = container.querySelector('.blog_wrapper #content #actions #like')
    expect(like_button).toBeDefined()

    // CLICK AND VERIFY MOCK FUNCTION CALLS X TIMES
    for (let x=1; x < 10; x++) {
        event.click(like_button)
        expect(mock_actions.like.mock.calls).toHaveLength(x)
    }
})