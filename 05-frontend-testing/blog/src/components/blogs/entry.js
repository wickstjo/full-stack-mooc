import { useState } from 'react'
import Actions from './actions'

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
        <div className={ 'blog_wrapper' } key={ blog.id }>
            <div id={ 'header' } onClick={ toggle }>
                <div id={ 'title' }>{ `${ blog.title } (${ blog.likes })` }</div>
                <div id={ 'visibility' }>{ style.display === 'none' ? 'show' : 'hide' }</div>
            </div>
            <div id={ 'content' } style={ style }>
                <div id={ 'blog' }>
                    <div className={ 'row' }>
                        <div>Author:</div>
                        <div id={ 'author' }>{ blog.author }</div>
                    </div>
                    <div className={ 'row' }>
                        <div>URL:</div>
                        <div><a href={ blog.url } target={ '_blank' } rel={ 'noreferrer' } id={ 'url' }>{ blog.url }</a></div>
                    </div>
                    <div className={ 'row' }>
                        <div>Likes:</div>
                        <div id={ 'likes' }>{ blog.likes }</div>
                    </div>
                    <div className={ 'row' }>
                        <div>Added by:</div>
                        <div id={ 'added_by' }>{ blog.user.username }</div>
                    </div>
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

export default Entry