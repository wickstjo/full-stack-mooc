import ReactDOM from 'react-dom/client'

import Apollo from './app/apollo'
import Redux from './redux'
import App from './app'

const root = document.getElementById('root')

// CREATE PROVIDER
ReactDOM.createRoot(root).render(
    <Apollo>
        <Redux>
            <App />
        </Redux>
    </Apollo>
)