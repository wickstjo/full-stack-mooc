import Actions from './actions'
import PropTypes from 'prop-types'

const Content = ({ blog, style }) => { return (
    <div id={ 'content' } style={ style }>
        <div>
            <div>Author:</div>
            <div id={ 'author' }>{ blog.author }</div>
        </div>
        <div>
            <div>URL:</div>
            <div>
                <a href={ blog.url } target={ '_blank' } rel={ 'noreferrer' } id={ 'url' }>{ blog.url }</a>
            </div>
        </div>
        <div>
            <div>Likes:</div>
            <div id={ 'likes' }>{ blog.likes }</div>
        </div>
        <div>
            <div>Added by:</div>
            <div id={ 'added_by' }>{ blog.user.username }</div>
        </div>
        <Actions
            blog={ blog }
        />
    </div>
)}

Content.propTypes = {
    blog: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
}

export default Content