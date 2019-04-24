import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './store/middleware'
import reducers from './store/reducers'

const store = createStore(reducers, middleware)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
document.getElementById('root'));