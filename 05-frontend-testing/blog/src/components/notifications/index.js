import './styles.scss'
import Entry from './entry'

const Notifications = ({ data }) => { return (
    <div id={ 'notifications' }>
        { data.map(entry =>
            <Entry
                key={ entry.id }
                data={ entry }
            />
        )}
    </div>
)}

export default Notifications