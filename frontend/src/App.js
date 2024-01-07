import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/shop'
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import Login from './Pages/Login'
import AddressPayment from './Pages/AddressPayment';
import paymentSuccess from './Pages/PaymentSucess';
import PaymentSuccess from './Pages/PaymentSucess';
import AllOrders from './Pages/AllOrders';
import SearchItems from './Pages/SearchItems';
function App() {
  return (
    <div>
     
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop/>}></Route>
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}></Route>
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}></Route>
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}></Route>
          <Route path="/product" element={<Product/>}>
            <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/signup' element={<LoginSignup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/address-and-payment' element={<AddressPayment/>}></Route>
          <Route path='/payment-success' element={<PaymentSuccess/>}>
            <Route path=":orderId" element={<PaymentSuccess/>}/>
          </Route>
          <Route path='/all-orders' element={<AllOrders/>}/>
          <Route path='/search-item' element={<SearchItems/>}/>
          </Routes>
          <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
