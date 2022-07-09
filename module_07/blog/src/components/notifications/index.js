import './styles.scss'
import { useSelector } from 'react-redux'
import Entry from './entry'

const Notifications = () => {

    // REDUX STATE
    const { notifications } = useSelector(state => state)

    return (
        <div id={ 'notifications' }>
            { notifications.map(entry =>
                <Entry
                    key={ entry.id }
                    item={ entry }
                />
            )}
        </div>
    )
}

export default Notifications