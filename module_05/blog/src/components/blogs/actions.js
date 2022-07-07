const Actions = ({ blog, user, actions }) => {
    switch (true) {

        // USER IS THE CREATOR
        case (blog.user.username === user): { return (
            <div id={ 'actions' }>
                <div className={ 'action' } id={ 'like' } onClick={ () => actions.like(blog.id) }>Like</div>
                <div className={ 'action' } id={ 'dislike' } onClick={ () => actions.dislike(blog.id) }>Dislike</div>
                <div className={ 'action' } id={ 'update' } onClick={ () => actions.update(blog) }>Update</div>
                <div className={ 'action' } id={ 'remove' } onClick={ () => actions.remove(blog.id) }>Remove</div>
            </div>
        )}

        // USER IS LOGGED IN, BUT NOT THE CREATOR
        case (user !== undefined): { return (
            <div id={ 'actions' }>
                <div className={ 'action' } id={ 'like' } onClick={ () => actions.like(blog.id) }>Like</div>
                <div className={ 'action' } id={ 'dislike' } onClick={ () => actions.dislike(blog.id) }>Dislike</div>
            </div>
        )}

        // OTHERWISE, RENDER NOTHING
        default: { return null }
    }
}

export default Actions