import { useState } from 'react'
import PropTypes from 'prop-types'

import Content from './content'

const Entry = ({ blog }) => {

    // STYLE STATE
    const [style, set_style] = useState({
        display: 'none'
    })

    // TOGGLE VISIBILITY
    const toggle = () => {
        set_style({
            display: style.display === 'none' ? 'block' : 'none'
        })
    }

    return (
        <div id={ 'wrapper' }>
            <div id={ 'header' } onClick={ toggle }>
                <div id={ 'title' }>{ `${ blog.title } (${ blog.likes })` }</div>
                <div id={ 'visibility' }>{ style.display === 'none' ? 'show' : 'hide' }</div>
            </div>
            <Content
                blog={ blog }
                style={ style }
            />
        </div>
    )
}

Entry.propTypes = {
    blog: PropTypes.object.isRequired,
}

export default Entry