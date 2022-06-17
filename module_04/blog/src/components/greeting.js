import Header from './header'

const Greeting = ({ header, credentials, revoke }) => { return (
    <div className={ 'wrapper' }>
        <Header text={ header } />
        <div className={ 'greeting' }>
            <div>{ credentials.username }</div>
            <div>
                <span className={ 'clicky' } onClick={ revoke }>Logout</span>
            </div>
        </div>
    </div>
)}

export default Greeting;