import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import {store} from './store/store.ts'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeWrapper } from './theme/theme.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeWrapper>
          <App/>
        </ThemeWrapper>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
