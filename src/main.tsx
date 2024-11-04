
import { createRoot } from 'react-dom/client'
import './index.css'

import Component from './teams-dashboard.tsx'
import { Provider } from 'react-redux'
import { store } from './store.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Component />
  </Provider>,
)
