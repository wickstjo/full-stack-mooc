import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import Redux from './redux'

const root = document.getElementById('root')
ReactDOM.createRoot(root).render(
    <Redux>
        <App />
    </Redux>
)