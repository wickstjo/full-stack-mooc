import { useEffect, useState } from 'react';

const Notification = ({ details }) => {

    const [active, set_active] = useState(false)

    // WHEN THE NOTIFICATION DETAILS CHANGE
    // CHECK WHETHER NOTIFICATION SHOULD BE ACTIVE
    useEffect(() => {
        if (details.category !== null) {
            set_active(true)
        }
    }, [details])

    // CONDITIONAL RENDERING
    switch (active) {

        // RENDER NOTIFICATION
        case true: { return (
            <div id={ 'notification' } className={ details.category }>
                { details.message }
            </div>
        )}

        // OTHERWISE, RENDER NOTHING
        default: { return null; }
    }
}

export default Notification;