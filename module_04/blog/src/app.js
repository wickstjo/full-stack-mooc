import './interface/general.scss'
import { useEffect, useState, useReducer, Fragment } from 'react'
import notif_reducer from './reducers/notifications';
import Notifications from './components/notifications'
import Auth from './auth'
import Blog from './blog'

const App = () => {

    // USER AUTH TOKEN & LOCAL STORAGE PROP
    const [credentials, set_credentials] = useState(null)
    const [storage_item] = useState('blog_token')

    // NOTIFICATIONS STATE
    const [notifications, set_notifications] = useReducer(notif_reducer, [])

    // CHECK LOCALSTORAGE FOR CREDENTIALS
    useEffect(() => {

        // FETCH ITEM FROM STORAGE
        const item = localStorage.getItem(storage_item);

        // IF ITS DEFINED, PARSE & SET DATA IN STATE
        if (item) {
            const parsed = JSON.parse(item)
            update_credentials(parsed)
        }
    }, [])

    // SAVE TOKEN APPROPRIATELY
    const update_credentials = (data) => {

        // SAVE CREDENTIALS IN LOCALSTORAGE
        const stringified = JSON.stringify(data)
        localStorage.setItem(storage_item, stringified);

        // SAVE CREDENTIALS IN STATE
        set_credentials(data)
    }

    // REVOKE CREDENTIALS
    const revoke_credentials = () => {
        localStorage.clear();
        set_credentials(null)
    }

    // PROCESS NOTIFICATIONS
    const notify = ({ type, message }) => {

        // CHECK MESSAGE TYPE
        const msg_type = typeof(message)

        // STRINGS
        if (msg_type === 'string') {
            set_notifications({
                type: type,
                message: message
            })

        // ARRAYS
        } else if (msg_type === 'object') {
            message.forEach(msg => {
                set_notifications({
                    type: type,
                    message: msg
                })
            })
        }
    }

    return (
        <Fragment>
            { credentials ?
                <Blog
                    credentials={ credentials }
                    revoke_credentials={ revoke_credentials }
                    notify={ notify }
                />
            :
                <Auth
                    set_credentials={ update_credentials }
                    notify={ notify }
                />
            }
            <Notifications
                data={ notifications }
                notify={ set_notifications }
            />
        </Fragment>
    )
}

export default App;