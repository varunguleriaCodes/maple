import React,{useState,useContext} from "react";
import './CSS/Login.css'
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const Login=()=>{
    const {all_products,userData,setUserData}=useContext(ShopContext)
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [errorMsg,setErrorMsg]=useState('')
    const [showErrorMsg,setShowErrorMsg]=useState(false)
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
            const currentResponse=response.data.data;
          if(response.data.status)
          {
            localStorage.setItem('access_token',response?.data.data?.access_token)

            setUserData(response.data.data.user_data)
            console.log(userData)
          }
        }).catch(error=>{

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
                <p className="loginsignup-login">Don't have an account?<span>Sign Up</span></p>
            </div>
        </div>
    )
}

export default Login