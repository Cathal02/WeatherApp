import React from 'react'
import App from './components/App'
import { BrowserRouter, Route } from 'react-router-dom'

export const routes = (
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>
)
