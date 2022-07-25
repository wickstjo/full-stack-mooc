import './notifications.scss'
import { connect } from 'react-redux'
import Entry from './entry'

const Notifications = ({ notifications }) => { return (
    <div id={ 'notifications' }>
        { notifications.map(entry =>
            <Entry
                key={ entry.id }
                item={ entry }
            />
        )}
    </div>
)}

// REQUIRED PROPS
const component_props = (state) => { return {
    notifications: state.notifications,
}}

// TRANSFORM & EXPORT
export default connect(component_props)(Notifications)