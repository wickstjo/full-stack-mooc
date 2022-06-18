import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Blogs = ({ data, user, actions }) => {

    // LIST OF SORTED BLOGS
    const [sorted, set_sorted] = useState([])
    
    // WHEN BLOG DATA CHANGES, SORT IT BY LIKES
    useEffect(() => {
        const temp = data.sort((a, b) => {
            return b.likes - a.likes
        })
        set_sorted(temp)
    }, [data])

    return (
        <div className={ 'container' }>
            <div>
                { sorted.map(blog =>
                    <Entry
                        blog={ blog }
                        actions={ actions }
                        user={ user }
                        key={ blog.id }
                    />
                )}
            </div>
        </div>
    )
}

const Entry = ({ blog, user, actions }) => {

    // STYLE STATE
    const [style, set_style] = useState({
        display: 'none'
    })

    // TOGGLE VISIBILITY
    const toggle = () => {
        set_style({
            display: style.display === 'none' ? 'flex' : 'none'
        })
    }

    return (
        <div className={ 'wrapper' } key={ blog.id }>
            <div className={ 'header' } onClick={ toggle }>
                <div>{ blog.id } ({ blog.likes })</div>
                <div>{ style.display === 'none' ? 'show' : 'hide' }</div>
            </div>
            <div className={ 'blog' } style={ style }>
                <div className={ 'row' }>
                    <div>Title:</div>
                    <div>{  blog.title }</div>
                </div>
                <div className={ 'row' }>
                    <div>Author:</div>
                    <div>{ blog.author }</div>
                </div>
                <div className={ 'row' }>
                    <div>URL:</div>
                    <div><a href={ blog.url } target={ '_blank' } rel={ 'noreferrer' }>{ blog.url }</a></div>
                </div>
                <div className={ 'row' }>
                    <div>Likes:</div>
                    <div>{ blog.likes }</div>
                </div>
                <div className={ 'row' }>
                    <div>Created by:</div>
                    <div>{ blog.user.username }</div>
                </div>
                <Actions
                    blog={ blog }
                    user={ user }
                    actions={ actions }
                />
            </div>
        </div>
    )
}

// BLOG ACTIONS
const Actions = ({ blog, user, actions }) => {
    switch (true) {

        // USER IS THE CREATOR
        case (blog.user.username === user): { return (
            <div className={ 'actions' }>
                <div className={ 'like' } onClick={ () => actions.like(blog.id) }>Like</div>
                <div className={ 'dislike' } onClick={ () => actions.dislike(blog.id) }>Dislike</div>
                <div className={ 'update' } onClick={ () => actions.update(blog) }>Update</div>
                <div className={ 'remove' } onClick={ () => actions.remove(blog.id) }>Remove</div>
            </div>
        )}

        // USER IS LOGGED IN, BUT NOT THE CREATOR
        case (user !== undefined): { return (
            <div className={ 'actions' }>
                <div className={ 'like' } onClick={ () => actions.like(blog.id) }>Like</div>
                <div className={ 'dislike' } onClick={ () => actions.dislike(blog.id) }>Dislike</div>
            </div>
        )}

        // OTHERWISE, RENDER NOTHING
        default: { return null }
    }
}

Blogs.propTypes = {
    data: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
}

export default Blogs;