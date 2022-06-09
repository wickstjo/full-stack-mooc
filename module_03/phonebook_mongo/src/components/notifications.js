import Header from './header.js'

const Notifications = ({ header, data }) => { return (
    <div className={ 'wrapper' }>
        <Header text={ header } />
        <div className={ 'notifications' }>
            <Content data={ data } />
        </div>
    </div>
)}

const Content = ({ data }) => {
    switch (data.length) {

        // NO CONTENT FOUND, RENDER NOTHING
        case 0: { return (
            <div className={ 'default' }>No notifications yet.</div>
        )}

        // OTHERWISE, RENDER NORMALLY
        default: { return (
            data.map(entry =>
                <div className={ 'notif' } key={ entry.id }>
                    <div className={ entry.type } />
                    <div className={ 'message' }>{ entry.message }</div>
                </div>
            )
        )}
    }
}

export default Notifications;