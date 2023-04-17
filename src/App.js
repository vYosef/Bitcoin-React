import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import './assets/scss/global.scss'
import { Home } from './views/Home'
import { ContactPage } from './views/ContactPage'
import { StatisticPage } from './views/StatisticPage'
import { ContactDetails } from './views/ContactDetails'
import { ContactEdit } from './views/ContactEdit'
import { AppHeader } from './cmps/AppHeader'

function App() {
  return (
    <Router>
      <section className="main-app">
        {/* <header className="app-header">
          <section className="container">
            <h1>Mister Bitcoin</h1>
          </section>
        </header> */}
        <AppHeader />

        <main className="container">
          <Switch>
            <Route path="/contacts/edit/:id?" component={ContactEdit} />
            <Route path="/contacts/:id" component={ContactDetails} />
            <Route path="/contacts" component={ContactPage} />
            <Route path="/statistics" component={StatisticPage} />
            <Route path="/" component={Home} />
          </Switch>
        </main>

        <footer>
          <section className="container">coffeeRights 2022 &copy;</section>
        </footer>
      </section>
    </Router>
  )
}

export default App
