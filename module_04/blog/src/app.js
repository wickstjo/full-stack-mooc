import './interface/general.scss'
import { useEffect, useState, useReducer, Fragment } from 'react'
import { create_blog, fetch_all, remove_blog, like_blog, dislike_blog, update_blog } from './funcs/blog'
import { login_user, create_user } from './funcs/user'

import notification_reducer from './reducers/notifications';
import prompt_reducer from './reducers/prompt';
import blog_reducer from './reducers/blogs'

import Menu from './components/menu'
import Notifications from './components/notifications'
import Blogs from './components/blogs'
import Prompt from './components/prompt'

const App = () => {

    // USER AUTH TOKEN & LOCAL STORAGE PROP
    const [credentials, set_credentials] = useState({})
    const storage_item = 'blog_token'

    // COMPONENT STATES
    const [notifications, set_notifications] = useReducer(notification_reducer, [])
    const [prompt, set_prompt] = useReducer(prompt_reducer, null)
    const [blogs, set_blogs] = useReducer(blog_reducer, [])

    // CHECK LOCALSTORAGE FOR CREDENTIALS
    useEffect(() => {

        // FETCH ITEM FROM STORAGE
        const item = localStorage.getItem(storage_item);

        // IF ITS DEFINED, PARSE & SET DATA IN STATE
        if (item) {
            const parsed = JSON.parse(item)
            update_credentials(parsed)
        }

        // FETCH ALL BLOGS
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

    // PROCESS NOTIFICATIONS
    const notify = ({ type, message }) => {

        // CHECK MESSAGE TYPE
        const msg_type = typeof(message)

        // STRINGS
        if (msg_type === 'string') {
            set_notifications({
                type: type,
                message: message
            })

        // ARRAYS
        } else if (msg_type === 'object') {
            message.forEach(msg => {
                set_notifications({
                    type: type,
                    message: msg
                })
            })
        }
    }
    
    // SAVE TOKEN APPROPRIATELY
    const update_credentials = (data) => {

        // SAVE CREDENTIALS IN LOCALSTORAGE
        const stringified = JSON.stringify(data)
        localStorage.setItem(storage_item, stringified);

        // SAVE CREDENTIALS IN STATE
        set_credentials(data)
    }

    // BLOG ACTIONS
    const blog_actions = {

        // REMOVE BLOG
        remove: async (id) => {
            
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
        },

        // UPDATE BLOG
        update: (blog) => {
            set_prompt({
                type: 'show',
                payload: {
                    window: 'update_blog',
                    blog: blog,
                    func: async (input, id) => {
                        
                        // ATTEMPT TO LOGIN
                        const response = await update_blog(input, id, credentials.token)

                        // ALL OK -- TRANSITION TO USER PAGE
                        if (response.status === 200) {

                            // NOTIFY USER
                            notify({
                                type: 'positive',
                                message: 'Blog successfully updated'
                            })

                            // FILTER BLOG FROM STATE
                            set_blogs({
                                type: 'update',
                                id: id,
                                mods: input
                            })

                            // HIDE PROMPT
                            set_prompt({ type: 'hide' })
                            return true
                        }

                        // OTHERWISE, CREATE ERROR
                        notify({
                            type: 'negative',
                            message: [
                                `Could not update blog (${ response.status })`,
                                ...response.data.errors
                            ]
                        })
                    }
                }
            })
        },

        // LIKE BLOG
        like: async (id) => {
            
            // ATTEMPT TO LIKE
            const response = await like_blog(id, credentials.token);

            // IF EVERYTHING WENT OK
            if (response.status === 200) {

                // PUSH NOTIFICATION
                notify({
                    type: 'positive',
                    message: 'Blog liked'
                })

                // FILTER BLOG FROM STATE
                set_blogs({
                    type: 'update',
                    id: id,
                    mods: {
                        likes: response.data.likes
                    }
                })

                return
            }

            // OTHERWISE, THROW ERROR
            notify({
                type: 'negative',
                message: [
                    `Could not like blog (${ response.status })`,
                    ...response.data.errors
                ]
            })
        },

        // DISLIKE BLOG
        dislike: async (id) => {
            
            // ATTEMPT TO LIKE
            const response = await dislike_blog(id, credentials.token);

            // IF EVERYTHING WENT OK
            if (response.status === 200) {

                // PUSH NOTIFICATION
                notify({
                    type: 'positive',
                    message: 'Blog disliked'
                })

                // FILTER BLOG FROM STATE
                set_blogs({
                    type: 'update',
                    id: id,
                    mods: {
                        likes: response.data.likes
                    }
                })

                return
            }

            // OTHERWISE, THROW ERROR
            notify({
                type: 'negative',
                message: [
                    `Could not dislike blog (${ response.status })`,
                    ...response.data.errors
                ]
            })
        }
    }

    // MENU ACTIONS
    const menu_actions = {

        // LOGIN
        login: () => {
            set_prompt({
                type: 'show',
                payload: {
                    window: 'login',
                    func: async (input) => {

                        // ATTEMPT TO LOGIN
                        const response = await login_user(input)

                        // ALL OK -- TRANSITION TO USER PAGE
                        if (response.status === 200) {

                            // RESET FIELDS & SET TOKEN
                            update_credentials(response.data)

                            // NOTIFY USER
                            notify({
                                type: 'positive',
                                message: 'User successfully logged in!'
                            })

                            // HIDE PROMPT
                            set_prompt({ type: 'hide' })
                            return true
                        }

                        // OTHERWISE, CREATE ERROR
                        notify({
                            type: 'negative',
                            message: [
                                `Could not log you in (${ response.status })`,
                                ...response.data.errors
                            ]
                        })
                    }
                }
            })
        },

        // LOGOUT
        logout: () => {

            // CLEAR TOKEN STORAGE
            localStorage.clear();
            set_credentials({})

            // CREATE NOTIFICATIONS
            notify({
                type: 'positive',
                message: 'You have been successfully logged out.'
            })
        },

        // REGISTER
        register: () => {
            set_prompt({
                type: 'show',
                payload: {
                    window: 'register',
                    func: async (input) => {

                        // DEFAULT USER PROFILE
                        const profile = {
                            username: input.username,
                            password: input.password
                        }

                        // IF DEFINED, PUSH NAME TO PROFILE
                        if (input.name !== '') {
                            profile.name = input.name
                        }
                        
                        // ATTEMPT TO REGISTER
                        const create_response = await create_user(profile)

                        // ALL OK -- USER CREATED
                        if (create_response.status === 201) {
                            
                            // NOTIFY USER
                            notify({
                                type: 'positive',
                                message: 'User successfully created!'
                            })

                            // ATTEMPT TO LOGIN
                            const login_response = await login_user({
                                username: profile.username,
                                password: profile.password,
                            })

                            // ALL OK -- TRANSITION TO USER PAGE
                            if (login_response.status === 200) {

                                // SET TOKEN
                                update_credentials(login_response.data)

                                // NOTIFY USER
                                notify({
                                    type: 'positive',
                                    message: 'User successfully logged in!'
                                })

                                set_prompt({ type: 'hide' })
                                return true
                            }

                            // NOTIFY USER
                            notify({
                                type: 'negative',
                                message: [
                                    `Could not log you in (${ login_response.status })`,
                                    ...login_response.data.errors
                                ]
                            })
                            
                            set_prompt({ type: 'hide' })
                            return true
                        }

                        // OTHERWISE, RENDER ERROR
                        notify({
                            type: 'negative',
                            message: [
                                `Could not register you in (${ create_response.status })`,
                                ...create_response.data.errors
                            ]
                        })
                    }
                }
            })
        },

        // CREATE BLOG
        create: () => {
            set_prompt({
                type: 'show',
                payload: {
                    window: 'create_blog',
                    func: async (input) => {

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

                            // HIDE THE PROMPT
                            set_prompt({ type: 'hide' })
                            return true
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
                }
            })
        },
    }

    return (
        <Fragment>
            <div id={ 'main' }>
                <Menu
                    actions={ menu_actions }
                    credentials={ credentials }
                />
                <Blogs
                    data={ blogs }
                    user={ credentials.username }
                    actions={ blog_actions }
                />
            </div>
            <Prompt
                state={ prompt }
                dispatch={ set_prompt }
            />
            <Notifications
                data={ notifications }
                notify={ set_notifications }
            />
        </Fragment>
    )
}

export default App;