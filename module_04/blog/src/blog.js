import { useReducer, useEffect } from 'react'
import { Form, Field, Button } from './components/input'
import Greeting from './components/greeting'
import Entry from './components/entry'

import { create_blog, fetch_all, remove_blog } from './funcs/blog'
import blog_reducer from './reducers/blogs'
import input_reducer from './reducers/input'

const Blog = ({ credentials, revoke_credentials, notify }) => {

    // BLOG STATE
    const [blogs, set_blogs] = useReducer(blog_reducer, [])

    // ON LOAD, FETCH BLOGS FROM API
    useEffect(() => {
        fetch_all().then(response => {
            
            // EVERYTHING WENT OK
            if (response.status === 200) {

                // UPDATE STATE WITH CONTENT
                set_blogs({
                    type: 'overwrite',
                    payload: response.data
                })

                // PUSH NOTIFICATIONS
                notify({
                    type: 'positive',
                    message: 'Blogs fetched successfully.'
                })

                return
            }

            // OTHERWISE, THROW ERROR
            notify({
                type: 'negative',
                message: [
                    `Could not fetch blogs (${ response.status })`,
                    ...response.data.errors
                ]
            })
        })
    }, [])

    // INPUT STATES
    const [input, set_input] = useReducer(input_reducer, {
        title: '',
        author: '',
        url: '',
    })

    // UPDATE INPUT FIELDS
    const update_input = (event, target) => {
        set_input({
            type: 'update',
            target: target,
            payload: event.target.value
        })
    }

    // REVOKE CREDENTIALS
    const revoke = () => {

        // REVOKE CREDENTIALS
        revoke_credentials()

        // PUSH NOTIFICATION
        notify({
            type: 'positive',
            message: 'You have been logged out!'
        })
    }

    // CREATE NEW BLOG ENTRY
    const create = async (event) => {
        event.preventDefault()

        // ATTEMPT TO CREATE THE BLOG
        const response = await create_blog(input, credentials.token)

        // IF EVERYTHING WENT OK
        if (response.status === 201) {

            // PUSH NOTIFICATION
            notify({
                type: 'positive',
                message: 'The blog was successfully created'
            })

            // PUSH BLOG TO STATE
            set_blogs({
                type: 'add',
                payload: response.data
            })

            // RESET FIELDS
            set_input({
                type: 'reset'
            })

            return
        }

        // OTHERWISE, THROW ERROR
        notify({
            type: 'negative',
            message: [
                `Could not create blog (${ response.status })`,
                ...response.data.errors
            ]
        })
    }

    // REMOVE BLOG
    const remove = async (id) => {

        // ATTEMPT TO REMOVE THE BLOG
        const response = await remove_blog(id, credentials.token);

        // IF EVERYTHING WENT OK
        if (response.status === 204) {

            // PUSH NOTIFICATION
            notify({
                type: 'positive',
                message: 'The blog was successfully removed'
            })

            // FILTER BLOG FROM STATE
            set_blogs({
                type: 'reduce',
                id: id
            })

            return
        }

        // OTHERWISE, THROW ERROR
        notify({
            type: 'negative',
            message: [
                `Could not remove blog (${ response.status })`,
                ...response.data.errors
            ]
        })
    }

    return (
        <div className={ 'container' }>
            <div>
                <Greeting
                    header={ 'Authentication' }
                    credentials={ credentials }
                    revoke={ revoke }
                />
                <Form header={ 'Create blog entry' } func={ create }>
                    <Field
                        label={ 'What is the title?' }
                        value={ input.title }
                        func={
                            event => update_input(event, 'title')
                        }
                    />
                    <Field
                        label={ 'Who is the author?' }
                        value={ input.author }
                        func={
                            event => update_input(event, 'author')
                        }
                    />
                    <Field
                        label={ 'What is the URL?' }
                        value={ input.url }
                        func={
                            event => update_input(event, 'url')
                        }
                    />
                    <Button
                        label={ 'Create' }
                        required={[
                            input.title,
                            input.author,
                            input.url
                        ]}
                    />
                </Form>
            </div>
            <div>
                { blogs.map(blog =>
                    <Entry
                        blog={ blog }
                        user={ credentials.username }
                        remove={ remove }
                        key={ blog.id }
                    />
                )}
            </div>
        </div>
    )
}

export default Blog;