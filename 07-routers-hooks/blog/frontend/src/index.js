import ReactDOM from 'react-dom/client'

import Redux from './redux'
import App from './app'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
    <Redux>
        <App />
    </Redux>
)