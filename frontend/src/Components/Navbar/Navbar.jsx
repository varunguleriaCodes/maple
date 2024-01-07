import React, { useState,useContext, useEffect } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { Dropdown} from 'react-bootstrap';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
const Navbar = () => {
    const {userData,cartData}=useContext(ShopContext)
    const [menu,setMenu]=useState("shop");
return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt=""/>
            <p>Mapple</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to="/">Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to="/mens">Man</Link>{menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to="/womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to="/kids">Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("all-order")}}><Link style={{textDecoration:'none'}} to="/all-orders">All Orders</Link>{menu==="all-order"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("search-item")}}><Link style={{textDecoration:'none'}} to="/search-item">Search</Link>{menu==="search-item"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
           { userData==null &&  <Link to="/login">
            <button className='nav-login-cart-button'>
                Login
            </button>
            </Link>
             }
             {
                    userData &&  <Dropdown>
                    <Dropdown.Toggle style={{background: '#fff',color: '#515151', border: '1px solid #fff'}} id="dropdown-autoclose-true">
                      Hi! {userData.username}
                    </Dropdown.Toggle>
              
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
                      {/* <Dropdown.Item href="#/action-2">Option 2</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Option 3</Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
             }
            <Link to="/cart">
            <img src={cart_icon} alt=""/>
            </Link>
            
            <div className="nav-cart-count">{cartData? cartData.items_data.length: 0}</div>

        </div>

    </div>
)
}
export default Navbar