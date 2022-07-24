import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const Entry = ({ item }) => {

    // REDUX DISPATCH
    const dispatch = useDispatch()

    // AFTER DURATION, REMOVE NOTIFICATION
    useEffect(() => {
        setTimeout(() => {
            dispatch({
                type: 'notifications/remove',
                id: item.id,
            })
        }, item.duration)
    }, [dispatch, item.duration, item.id])

    return (
        <div className={ 'item' }>
            <div id={ item.kind }>
                { item.message }
            </div>
        </div>
    )
}

Entry.propTypes = {
    item: PropTypes.object.isRequired,
}

export default Entry