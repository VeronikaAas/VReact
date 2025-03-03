import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react'
import Navbar from './components/header/Navbar';
import Home from './views/1.home/Home';
import Single from './views/2.singleproduct/Single';
import Checkout from './views/3.checkout/Checkout';
import Success from './views/4.checkoutsuccess/Success';
import Contact from './views/5.contact/Contact';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/single" element={<Single />} />
          <Route path="/success" element={<Success />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App