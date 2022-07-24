import { render, event } from './test_suite'
import Blog from '../components/blogs/entry'
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

const create_container = () => {
    return render(
        <Redux>
            <Blog blog={ mock_blog } />
        </Redux>
    ).container
}

test('Header text renders correctly', async () => {
    const selector = create_container().querySelector('#wrapper #header #title')
    const header_string = `${ mock_blog.title } (${ mock_blog.likes })`

    expect(selector).toBeDefined()
    expect(selector).toHaveTextContent(header_string)
})

test('Blog content is hidden by default', async () => {
    const selector = create_container().querySelector('#wrapper #content')

    expect(selector).toBeDefined()
    expect(selector).toHaveStyle('display: none')
})

test('Visibility label renders correctly', async () => {
    const selector = create_container().querySelector('#wrapper #header #visibility')

    expect(selector).toBeDefined()
    expect(selector).toHaveTextContent('show')
})

test('Clicking the header repeatedly toggles content', async () => {

    const container = create_container()

    // CLICK THE HEADER
    const header = container.querySelector('#wrapper #header')
    expect(header).toBeDefined()
    event.click(header)

    // CHECK IF THE BLOG CONTENT IS NOW VISIBLE
    const content = container.querySelector('#wrapper #content')
    expect(content).toBeDefined()
    expect(content).toHaveStyle('display: block')

    event.click(header)
    expect(content).toHaveStyle('display: none')
})

test('Blog text contents render correctly', async () => {

    // PROPERTIES TO CHECK
    const properties = ['author', 'url', 'likes']

    // COMPARE EACH PROPERTY
    properties.forEach(name => {
        const selector = create_container().querySelector(`#wrapper #content #${ name }`)

        expect(selector).toBeDefined()
        expect(selector).toHaveTextContent(mock_blog[name])
    })
})