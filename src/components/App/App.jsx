import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import LoginPage from '../LoginPage'
import Shopping from '../Shopping'
import Header from '../Header'
import NotFound from '../NotFound'

import './styles/App.scss'

const App = () => {
  const location = useLocation()
  const { pathname } = location
  return (
    <>
      {pathname !== '/login' && <Header />}
      <main className="buybuybuy">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route
            exact
            key="shopping:category"
            path="/shopping/:category"
            component={Shopping}
          />
          <Route exact key="shopping:iphone" path="/" component={Shopping} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  )
}

export default App
