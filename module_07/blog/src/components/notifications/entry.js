import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

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
    }, [])

    return (
        <div className={ 'item' }>
            <div id={ item.kind }>
                { item.message }
            </div>
        </div>
    )
}

export default Entry