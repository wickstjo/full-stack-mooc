import { useDispatch, useSelector } from 'react-redux'

const Actions = ({ blog, actions }) => {

    // REDUX HOOKS
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // UPDATE BLOG
    const update = () => {
        dispatch({
            type: 'prompts/update',
            blog: blog,
            callback: actions.update
        })
    }

    switch (true) {

        // USER IS THE CREATOR
        case (blog.user.username === auth.username): { return (
            <div id={ 'actions' }>
                <div className={ 'action' } id={ 'like' } onClick={ actions.like }>Like</div>
                <div className={ 'action' } id={ 'dislike' } onClick={ actions.dislike }>Dislike</div>
                <div className={ 'action' } id={ 'update' } onClick={ update }>Update</div>
                <div className={ 'action' } id={ 'remove' } onClick={ actions.remove }>Remove</div>
            </div>
        )}

        // USER IS LOGGED IN, BUT NOT THE CREATOR
        case (auth.username !== undefined): { return (
            <div id={ 'actions' }>
                <div className={ 'action' } id={ 'like' } onClick={ actions.like }>Like</div>
                <div className={ 'action' } id={ 'dislike' } onClick={ actions.dislike }>Dislike</div>
            </div>
        )}

        // OTHERWISE, RENDER NOTHING
        default: { return null }
    }
}

export default Actions