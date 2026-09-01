import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import AnnouncementBar from './components/AnnouncementBar'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import SignIn from './pages/SignIn'
import CreateAccount from './pages/CreateAccount'
import VerifyOtp from './pages/VerifyOtp'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-account/verify" element={<VerifyOtp />} />
      </Routes>
      <Footer />
    </div>
  )
}
