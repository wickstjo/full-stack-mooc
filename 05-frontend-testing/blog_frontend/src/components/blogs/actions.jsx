import { useDispatch, useSelector } from 'react-redux'
import useResource from '../../hooks/resource'
import PropTypes from 'prop-types'

const Actions = ({ blog, mock_actions=false }) => {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const service = useResource({
        url: 'http://localhost:3001/api/blogs',
        resource_name: 'blogs'
    })

    const update = () => {
        dispatch({
            type: 'prompts/open',
            window: 'update_blog',
            blog
        })
    }

    // FOR UNIT TESTING ONLY
    if (mock_actions) { return (
        <div id={ 'actions' }>
            <div className={ 'action' } id={ 'like' } onClick={ () => mock_actions.like(blog.id) }>Like</div>
            <div className={ 'action' } id={ 'dislike' } onClick={ () => mock_actions.dislike(blog.id) }>Dislike</div>
            <div className={ 'action' } id={ 'update' } onClick={ () => mock_actions.update(blog) }>Update</div>
            <div className={ 'action' } id={ 'remove' } onClick={ () => mock_actions.remove(blog.id) }>Remove</div>
        </div>
    )}

    // IF SESSION USER IS THE AUTHOR
    if (blog.user.username === auth.username) { return (
        <div id={ 'actions' }>
            <div className={ 'action' } id={ 'like' } onClick={ () => service.like(blog.id) }>Like</div>
            <div className={ 'action' } id={ 'dislike' } onClick={ () => service.dislike(blog.id) }>Dislike</div>
            <div className={ 'action' } id={ 'update' } onClick={ update }>Update</div>
            <div className={ 'action' } id={ 'remove' } onClick={ () => service.remove(blog.id) }>Remove</div>
        </div>
    )}

    // SESSION EXISTS
    if (auth.session) { return (
        <div id={ 'actions' }>
            <div className={ 'action' } id={ 'like' } onClick={ () => service.like(blog.id) }>Like</div>
            <div className={ 'action' } id={ 'dislike' } onClick={ () => service.dislike(blog.id) }>Dislike</div>
        </div>
    )}

    // OTHERWISE, RENDER NOTHING
    return null
}

Actions.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default Actions