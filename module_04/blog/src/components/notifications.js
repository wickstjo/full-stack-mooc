import { useEffect, useState } from 'react'

const Notifications = ({ data }) => { return (
    <div className={ 'wrapper' }>
        <div className={ 'notifications' }>
            <div>
                { data.map(entry =>
                    <Entry
                        key={ entry.id }
                        data={ entry }
                    />
                )}
            </div>
            <div></div>
        </div>
    </div>
)}

const Entry = ({ data }) => {

    // STYLE STATE
    const [style, set_style] = useState({})
    
    // AFTER 2 SECONDS, HIDE NOTIFICATION WITH CSS
    useEffect(() => {
        setTimeout(() => {
            set_style({
                display: 'none'
            })
        }, 20000)
    }, [])

    return (
        <div style={ style }>
            <div className={ data.type }>
                { data.message }
            </div>
        </div>
    )
}

export default Notifications;