import React,{useState} from "react";
import './CSS/LoginSignup.css'
import './CSS/Modal.css'
import axios from "axios";
import { useNavigate,Link } from 'react-router-dom';
const LoginSignup=()=>{
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [showErrorMsg,setShowErrorMsg]=useState(false)
    const [errorMsg,setErrorMsg]=useState('')
    const [modal,setModal]=useState(false)
    const navigate=useNavigate()
    const checkFormValidation=()=>{
        if(userName.length===0) {
            setShowErrorMsg(true)
            setErrorMsg("Your Name Can't Remain Empty")
            return false;
        }
        if(email.length===0){
            setShowErrorMsg(true)
            setErrorMsg("Email Can't Remain Empty")
            return false;
        }
        if(password.length===0)
        {
            setShowErrorMsg(true)
            setErrorMsg("Password Can't Remain Empty")
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
    const handleSignUp=()=>{
     if(!checkFormValidation()) return;
     setShowErrorMsg(false)
     setErrorMsg('')
     let signupData={
        "username":userName.trim(),
        "email":email,
        "password":password.trim()
     }
    axios.post('http://127.0.0.1:5000/register',signupData).then(response=>{
        if(response.status)
        {
          setUserName('')
          setEmail('')
          setPassword('')
          navigate('/login')
        }
    }).catch(error=>{
       setModal(true);
       document.body.classList.add('active-modal')
    })
    }
    const toggleModal=()=>{
        setModal(false);
        document.body.classList.remove('active-modal')
        setUserName('')
        setEmail('')
        setPassword('')
    }
    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="Your Name" onChange={(e)=>setUserName(e.target.value)}/>
                    <input type="email" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="loginsignup-agree">
                {showErrorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                </div>
                <button onClick={()=>handleSignUp()}>Sign Up</button>
                <p className="loginsignup-login">Already have an account?<span><Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login Here</Link></span></p>
            </div>
            {modal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Error Popup</h2>
            <p>
             We are currently facing an error! Please try again later.
            </p>
            <div className="close-modal">
            <button  onClick={()=>toggleModal()}>
              CLOSE
            </button>
            </div>
          </div>
        </div>
      )}
        </div>
    )
}

export default LoginSignup