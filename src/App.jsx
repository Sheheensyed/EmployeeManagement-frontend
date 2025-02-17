// import { Container, Nav, Navbar } from 'react-bootstrap'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Employee from './pages/Employee'
import PageNotFound from './pages/PageNotFound'
import Header from './components/Header'
import Footer from './components/Footer'
import ContactUs from './pages/ContactUs'
import Products from './pages/Products'
import Admin from './pages/Admin'
import ContextShare from './context/ContextShare'

function App() {

  return (
    <>
   <ContextShare>
      <Header/>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/login'} element={<SignIn/>} admin={true}/>
          <Route path={'/register'} element={<SignIn register={true}/>} />
          <Route path={'/dashboard'} element={<Employee/>} />
          <Route path={'/contact'} element={<ContactUs/>} />
          <Route path={'/products'} element={<Products/>} />
          <Route path={'/admin'} element={<Admin/>} />
          <Route path={'*'} element={<PageNotFound/>} />
        </Routes>
        <Footer/>
   </ContextShare>
    </>
  )
}

export default App
