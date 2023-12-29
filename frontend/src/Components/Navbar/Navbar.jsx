import React, { useState,useContext } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Navbar = () => {
    const {userData}=useContext(ShopContext)
    const [menu,setMenu]=useState("shop");
    console.log('10',userData)
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
        </ul>
        <div className="nav-login-cart">
           { userData==null &&  <Link to="/login">
            <button>
                Login
            </button>
            </Link>
             }
             {
                // userData && <span><ul>
                //     <li><span>Hi {userData.username}</span>
                //     <ul className="dropdown">
                //         <li>Log Out</li>
                //     </ul>
                //     </li>
                //     </ul></span>
                    userData &&  <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </DropdownButton>
             }
            <Link to="/cart">
            <img src={cart_icon} alt=""/>
            </Link>
            
            <div className="nav-cart-count">0</div>

        </div>

    </div>
)
}
export default Navbar