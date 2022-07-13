import { useDispatch, useSelector } from 'react-redux'

const Actions = ({ blog, service }) => {

    // REDUX HOOKS
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // UPDATE BLOG
    const update = () => {
        dispatch({
            type: 'prompts/update',
            resource: blog,
            service: service.update
        })
    }

    // ADD COMMENT
    const comment = () => {
        dispatch({
            type: 'prompts/comment',
            service: service.comment
        })
    }

    switch (true) {

        // USER IS THE CREATOR
        case (blog.user.username === auth.username): { return (
            <div id={ 'actions' }>
                <div className={ 'action' } id={ 'like' } onClick={ service.like }>Like</div>
                <div className={ 'action' } id={ 'dislike' } onClick={ service.dislike }>Dislike</div>
                <div className={ 'action' } id={ 'comment' } onClick={ comment }>Comment</div>
                <div className={ 'action' } id={ 'update' } onClick={ update }>Update</div>
                <div className={ 'action' } id={ 'remove' } onClick={ service.remove }>Remove</div>
            </div>
        )}

        // USER IS LOGGED IN, BUT NOT THE CREATOR
        case (auth.username !== undefined): { return (
            <div id={ 'actions' }>
                <div className={ 'action' } id={ 'like' } onClick={ service.like }>Like</div>
                <div className={ 'action' } id={ 'dislike' } onClick={ service.dislike }>Dislike</div>
                <div className={ 'action' } id={ 'comment' } onClick={ comment }>Comment</div>
            </div>
        )}

        // OTHERWISE, RENDER NOTHING
        default: { return null }
    }
}

export default Actions