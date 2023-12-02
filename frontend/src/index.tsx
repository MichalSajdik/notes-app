import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const rootElement: HTMLElement | null = document.getElementById('root')
if (rootElement === null) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
