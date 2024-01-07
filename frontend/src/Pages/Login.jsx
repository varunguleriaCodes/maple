import React,{useState,useContext} from "react";
import './CSS/Login.css'
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate,Link } from 'react-router-dom';
import Popup from'../Components/Popup/Popup'
const Login=()=>{
    const {userData,setUserData,cartData,setCartData}=useContext(ShopContext)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errorMsg,setErrorMsg]=useState('')
    const [showErrorMsg,setShowErrorMsg]=useState(false)
    const [modal,setModal]=useState(false)
    const navigate=useNavigate()
    const checkLoginFormValidation =()=>{
        if(email==='' && password==='')
        {
            setErrorMsg('Please enter Email and Password than try logging in again.')
            setShowErrorMsg(true)
            return false;
        }
        if(email===''){
            setErrorMsg('Please enter Email than try logging in again.')
            setShowErrorMsg(true)
            return false;
        }
        if(password==='')
        {
            setErrorMsg('Please enter Password than try logging in again.')
            setShowErrorMsg(true)
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        if(!isValid){
            setShowErrorMsg(true)
            setErrorMsg("Please Enter a Valid Email")
            return false;
        }
        return true
    }
    const userLogin=()=>{
        if(!checkLoginFormValidation()) return;
        let loginData={
            "email":email,
            "password":password
        }
        axios.post('http://127.0.0.1:5000/login',loginData).then(response=>{
            console.log(response.data.data)
          if(response.data.status)
          {
            localStorage.setItem('user_data',JSON.stringify(response?.data.data?.user_data))

            setUserData(response.data.data.user_data)
            console.log(userData)
            axios.get('http://127.0.0.1:5000/cart?user_id='+response.data.data.user_data._id).then(response=>{
                console.log(response)
                if(response.data.data!=null && response.data.data.length!=0) setCartData(response.data.data)
                navigate('/')
            })
            
          }
        }).catch(error=>{
            setModal(true);
            document.body.classList.add('active-modal')
            setUserData(null)
        })
    }
    return(
        <div className="loginsignup">
            <div className="login-container">
                <h1>Login</h1>
                <div className="loginsignup-fields">
                    <input type="email" placeholder="Email Address" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <input type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                {showErrorMsg && <p style={{ color: 'red', marginTop:10 }}>{errorMsg}</p>}
                <button onClick={()=>userLogin()}>Login</button>
                <p className="loginsignup-login">Don't have an account?<Link to="/signup" style={{ textDecoration: 'none', color: '#ff4141' }}>Sign Up</Link></p>
            </div>
            {modal && <Popup show={modal} onHide={() => setModal(false)} error_message={"Facing some issues, Please Try Again Later."}/>}
        </div>
    )
}

export default Login