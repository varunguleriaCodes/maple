import React,{useContext,useState} from "react";
import { ShopContext } from "../Context/ShopContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './CSS/AddressPayment.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../Components/Popup/Popup";
const AddressPayment=()=>{
    const {userData,setUserData,cartData,setCartData}=useContext(ShopContext)
    const [street,setStreet]=useState('')
    const [city,setCity]=useState('')
    const [zip,setZip]=useState('')
    const [country,setCountry]=useState('')
    const [state,setState]=useState('')
    const [show,setShow]=useState(false)
    const [cardNumber,setCardNumber]=useState('')
    const [cardName,setCardName]=useState('')
    const [cvv,setCvv]=useState('')
    const [cardDate,setCardDate]=useState('')
    const [showCardMsg,setShowCardMsg]=useState(false)
    const navigate=useNavigate()
    const handleClose = () => setShow(false);
    const [errorMsgModal,setErrorMsgModal]=useState(false)
    const addNewAddress=()=>{
      console.log(userData)
      var newAddress={
        "street":street,
        "city":city,
        "zip":zip,
        "state":state,
        "country":country
      }
      var newData={}
      newData={...userData}
      if(userData!=null && userData.Address){
        console.log('28')
        newData.Address.push(newAddress)
      }
      else if(userData!=null && !userData.Address)
      {
        newData['Address']=[]
        newData.Address.push(newAddress)
      }
      delete newData['_id']
      axios.put('http://127.0.0.1:5000/user/'+userData?._id,newData).then(response=>{
        console.log(response)
        if(response.data.status)
        {
          setUserData(response.data.updated_user)
          setShow(false);
        }
      })
  
    }
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event,address) => {
      setSelectedOption(event.target.value);
      var newData={...cartData,}
      console.log('60',address)
      newData['delivery_address']=address
      console.log('63',newData)
      axios.put('http://127.0.0.1:5000/cart?_id='+cartData._id,newData).then(response=>{
        console.log(response)
        if(response.data.status){
          setCartData(response.data.data)
        }
      })
    };

    const paymentCompletion=(e)=>{
      e.preventDefault()
      if(selectedOption=='')
      {
        setErrorMsgModal(true)
        return
      }
      if(cardNumber==''||cardName==''||cvv==''||cardDate==""){ setShowCardMsg(true)
        return;
      }
      setShowCardMsg(false)
      
      axios.post('http://127.0.0.1:5000/create-payment',cartData).then(response=>{
        console.log(response)
        if(response.data.status)
        {
          navigate('/payment-success/'+response.data.data._id)
        }
      })

    }

 return (
    <div className="container">
        
      
    <div className="row">
        <div className="col-md-6 mt-5">
          <div className="d-flex">
            <div>
             <h1 className="address-heading">Select Address</h1>
             </div>
             <div className="mt-2" style={{marginLeft:50}}>
             <button className="btn btn-primary"  onClick={()=>{setShow(true)}}>Add Address</button>
             </div>
             </div>
            { userData && userData.Address && 
            userData.Address.map((address,i)=>{
              return (
                <div style={{display:'block'}} key={i}>
                <label>
                <input
                  type="radio"
                  value={`${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`}
                  checked={selectedOption === `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zip}`}
                  onChange={(event)=>handleOptionChange(event,address)}
                />
                <span>{address.street}, {address.city}, {address.state}, {address.country}, {address.zip}</span>
              </label>
              </div>
              )
            })
          }
          <hr/>
        </div>
        <div className="col-md-6">
        <form action="" className="credit-card">
    <div className="form-header">
      <h4 className="title">Card Details</h4>
    </div>
    <div className="form-body">
      <input type="text" placeholder="Card Number" className="card-number" onChange={(e)=>{setCardNumber(e.target.value)}}/>  
      <input type="text" placeholder="CardHolder Name" className="card-number" onChange={(e)=>{setCardName(e.target.value)}}/>
      <div className="card-verification">
        <div className="cvv-input d-flex">
          <input type="text" placeholder="CVV" onChange={(e)=>{setCvv(e.target.value)}}/>
          <input type="text" placeholder="mm/yyyy" onChange={(e)=>{setCardDate(e.target.value)}}/>
        </div>    
      </div>
      {showCardMsg &&
      <p style={{color:'red'}}>Please fill all the card details before moving forward.</p>}
      <button type="submit" className="proceed-btn mt-1" onClick={(event)=>paymentCompletion(event)}>Proceed</button>
    </div>
        </form>
        </div>
    </div>
    {show &&  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginTop:-20}}>
         <form>
         <div className="form-group">
           <input type="street" 
         className="form-control fc" 
         id="inputStreet" 
         placeholder="Street" onChange={(e)=>{setStreet(e.target.value)}}/>
  
  <input type="city" 
         className="form-control fc" 
         id="inputCity" 
         placeholder="City" onChange={(e)=>{setCity(e.target.value)}}/>
  
  <input type="state" 
         className="form-control fc" 
         id="inputState" 
         placeholder="State" onChange={(e)=>{setState(e.target.value)}}/>
  
  <input type="zip" 
         className="form-control fc" 
         id="inputZip" 
         placeholder="Zip" onChange={(e)=>{setZip(e.target.value)}}/>
  
  <input type="country" 
         className="form-control fc" 
         id="inputCountry" 
         placeholder="Country" onChange={(e)=>{setCountry(e.target.value)}}/>
</div>
         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{addNewAddress()}}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>}
      {errorMsgModal && <Popup show={errorMsgModal} onHide={() => setErrorMsgModal(false)} error_message={"Please Select an Address First"}/>}
    </div>
 )
}

export default AddressPayment
