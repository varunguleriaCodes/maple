import React, { useContext,useState } from "react";
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from "../../Context/ShopContext";
import Popup from "../Popup/Popup";
import axios from "axios";
const ProductDisplay=(props)=>{
    const {product}=props;
    const [size,setSize]=useState('')
    const {userData,cartData,setCartData}=useContext(ShopContext)
    const [modal,setModal]=useState(false);
    const  [modalMsg,setModalMsg]=useState('')
    const addToCart=(id)=>{
        if(userData==null){
         setModal(true)
         setModalMsg("Please Login to Add items to cart.")
         return;
        }
        if(size=='')
        {
         setModal(true)
         setModalMsg("Please Select a size first")
         return;            
        }
       if(cartData==null){
        product["quantity"]=1
        product["item_total_cost"]=product["new_price"]
        var cart={
          "user_data":userData,
          "items_data":[product]
        }
       axios.post('http://127.0.0.1:5000/cart',cart).then(response=>{
          console.log(response)
          if(response.data.status){
            setCartData(response.data.data)
            setSize('')
            setModalMsg("")
            console.log(cartData)
          }
       })
    }
    else{
        axios.get('http://127.0.0.1:5000/search-cart?item_id='+product._id).then(response=>{
            console.log(response)
            if(response.data.status)
            {
                if(response.data.already_present){
                    setModalMsg('Item is already added to cart, You can add or remove more from the cart.')
                    setModal(true)
                    setSize('')
                }
                else{
                    console.log(cartData)
                    var newCartData={...cartData}
                    console.log(cartData)
                    product['quantity']=1
                    product["item_total_cost"]=product["new_price"]
                    newCartData.items_data.push(product)
                    axios.put('http://127.0.0.1:5000/cart?_id='+cartData._id,newCartData).then(response=>{
                        console.log(response)
                        if(response.data.status){
                            setCartData(response.data.data)
                            setSize('')
                            setModalMsg("")
                        }
                    })
                }
            }
        })
    }
    }
    const getBackgroundColor = (selectedSize) => {
        return size === selectedSize ? '#ff4141' : ''; 
      };
    const setTextColor = (selectedSize)=>{
        return size === selectedSize ? '#fff' : ''; 
    }
return(
    <div className="productdisplay">
        <div className="productdisplay-left">
            {/* <div className="productdisplay-img-list">
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
                <img src={product.image} alt=''/>
            </div> */}
            <div className="productdisplay-img">
                <img className="productdisplay-main-img" src={product.image} alt=''/>
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            {/* <div className="productdisplay-right-stars">
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_icon} alt=""/>
                <img src={star_dull_icon} alt=""/>
                <p>122</p>
            </div> */}
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">{product.small_description}</div>
            <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="productdisplay-right-sizes">
               <div onClick={()=>setSize('s')} style={{ backgroundColor: getBackgroundColor('s'),color:setTextColor('s') }}>S</div> 
               <div onClick={()=>setSize('m')} style={{ backgroundColor: getBackgroundColor('m'),color:setTextColor('m') }}>M</div> 
               <div onClick={()=>setSize('l')} style={{ backgroundColor: getBackgroundColor('l'),color:setTextColor('l') }}>L</div> 
               <div onClick={()=>setSize('xl')} style={{ backgroundColor: getBackgroundColor('xl'),color:setTextColor('xl') }}>XL</div> 
               <div onClick={()=>setSize('xxl')} style={{ backgroundColor: getBackgroundColor('xxl'),color:setTextColor('xxl') }}>XXL</div> 
            </div>
        </div>
         <button onClick={()=>{addToCart(product._id)}}>Add To Cart</button> 
        <p className="productdisplay-right-category">
            <span>Category:</span> Women, T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
            <span>Tags:</span> Modern, Latest
        </p>
        </div>
        <Popup show={modal} onHide={() => setModal(false)} error_message={modalMsg}/>
    </div>
)
}
export default ProductDisplay;