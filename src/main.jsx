import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'
import { ThemeProvider } from './components/theme-provider'
import Provider from './context'

createRoot(document.getElementById('root')).render(
    <Provider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>

)
