import Header from './header'
import { throttle } from '../funcs/misc'

const Entry = ({ blog, user, remove }) => { return (
    <div className={ 'wrapper' } key={ blog.id }>
        <Header text={ throttle(blog.id, 20) } />
        <div className={ 'blog' }>
            <div>
                <div>Title:</div>
                <div>{  throttle(blog.title, 30) }</div>
            </div>
            <div>
                <div>Author:</div>
                <div>{ throttle(blog.author, 30) }</div>
            </div>
            <div>
                <div>URL:</div>
                <div><a href={ blog.url } target={ '_blank' }>{ throttle(blog.url, 30) }</a></div>
            </div>
            <div>
                <div>Likes:</div>
                <div>{ blog.likes }</div>
            </div>
            <div>
                <div>Created by:</div>
                <div>{ blog.user.username }</div>
            </div>
            <Remove
                blog={ blog }
                user={ user }
                remove={ remove }
            />
        </div>
    </div>
)}

const Remove = ({ blog, user, remove }) => {
    switch(blog.user.username === user) {

        // ADD REMOVE BUTTON
        case true: { return (
            <div className={ 'action' } onClick={ () => remove(blog.id) }>
                Remove Blog
            </div>
        )}

        // OTHERWISE, RENDER NOTHING
        default: {
            return null
        }
    }
}

export default Entry;