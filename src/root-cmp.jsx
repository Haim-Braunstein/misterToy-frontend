import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
// import '../src/assets/style/main.css'
import './assets/styles/main.scss'



import { ToyIndex } from './pages/ToyIndex'
import { HomePage } from './pages/HomePage'
import { ToyDetails } from './pages/ToyDetails'
import { Dashboard } from './pages/Dashboard'
import { About } from './pages/About'

import { AppHeader } from './cmps/AppHeader'
import { store } from './store/store'
import { UserMsg } from './cmps/UserMsg'
import { ToyEdit } from './pages/ToyEdit'


export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className='main-layout'>


            <Routes>
              <Route element={<HomePage />} path='/' />
              <Route element={<About />} path='/about' />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
              <Route element={<ToyIndex />} path='/toy' />
              <Route element={<Dashboard />} path='/toy/dashboard' />
              <Route element={<ToyDetails />} path={'/toy/:id'} />

            </Routes>

          </main>

        </section>
        <UserMsg/>
      </Router>
    </Provider>
  )



}

