import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import user_event from '@testing-library/user-event'

import Blogs from '../index'
import mock_blogs from './mock_data.json'
const mock_blog = mock_blogs[0]
const mock_actions = {
    like: jest.fn()
}

// BEFORE EVERY TEST...
beforeEach(() => {

    // CREATE CONTAINER
    const { container } = render(
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
    user_event.click(header)
    
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
        user_event.click(like_button)
        expect(mock_actions.like.mock.calls).toHaveLength(x)
    }
})