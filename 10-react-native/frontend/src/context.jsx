import Apollo from './apollo'
import Redux from './redux/'
import { NativeRouter } from 'react-router-native'

export default ({ children }) => { return (
    <Redux>
        <Apollo>
            <NativeRouter>
                { children }
            </NativeRouter>
        </Apollo>
    </Redux>
)}