import React, { useContext, useEffect, useState } from "react";
import './CartItems.css'
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CartItems=()=>{
    const {all_product,cartData,userData,setCartData}=useContext(ShopContext)
    const navigate=useNavigate()
    const [totalCost,setTotalCost]=useState(0)
    useEffect(()=>{
        var total=0
        if(cartData!==null){
        cartData.items_data.forEach(res=>{
            total+=res.new_price*res.quantity
        })
        setTotalCost(total)
    }
    },[])
    const addItem =(itemId,itemQuantity)=>{
        console.log('99')
        var newCartData=cartData;
        newCartData.items_data.forEach(item=>{
        if(item._id===itemId){
            item.quantity=itemQuantity+1
        }
      })
      axios.put('http://127.0.0.1:5000/cart',newCartData).then(response=>{
        console.log(response)
        if(response.data.status){
          var total=0
        response.data.data.items_data.forEach(res=>{
        res['item_total_cost']=res.new_price*res.quantity
        total+=res.new_price*res.quantity
        })
        setCartData(response.data.data)
        setTotalCost(total)
        }
      })
    }
    const decreaseItem=(itemId,itemQuantity)=>{
        var newCartData=cartData;
        var delete_index=null
        newCartData.items_data.forEach((item,i)=>{
        if(item._id===itemId){
            item.quantity=itemQuantity-1
            if(item.quantity==0) delete_index=i;
        }
      })
      if(delete_index!==null)
      {
        newCartData.items_data.splice(delete_index,1)
        delete_index=null
      }
      axios.put('http://127.0.0.1:5000/cart',newCartData).then(response=>{
        console.log(response)
        if(response.data.status){
          var total=0
          response.data.data.items_data.forEach(res=>{
              res['item_total_cost']=res.new_price*res.quantity
              total+=res.new_price*res.quantity
          })
          setTotalCost(total)          
          setCartData(response.data.data)
        }
      })
    }
    const placeOrder=()=>{
      navigate('/address-and-payment')
    }
    console.log(all_product)
 return(

    <div className="cartitems" >
      <div className="container">
        {cartData==null && userData==null &&
              <h4 style={{marginTop:150,marginBottom:150}} className="d-flex justify-content-center">Please Login to view your cart items</h4> }
        {cartData && userData!=null &&
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{width:"50%"}}>Product</th>
              <th style={{width:"10%"}}>Price</th>
              <th style={{width:'8%'}}>Quantity</th>
              <th style={{width:"22%"}} className="text-center">Subtotal</th>
              <th style={{width:"10%"}}>Add/Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartData.items_data.map((e,i)=>{
              return(
            <tr>

              <td data-th="Product">
                <div className="row">
                  <div className="col-sm-2 hidden-xs"><img src={e.image} alt="..." className="img-responsive" style={{height:100,width:100}} /></div>
                  <div className="col-sm-10">
                    <h4 className="nomargin">Item {i+1}</h4>
                    <p>{e.name}</p>
                  </div>
                </div>
              </td>
              <td data-th="Price">${e.new_price}</td>
              <td data-th="Quantity"  style={{ textAlign: 'center' }}>
                {e.quantity}
              </td>
              <td data-th="Subtotal" className="text-center"> {e.item_total_cost}
      </td>
              <td className="actions" data-th="">
                <button className="btn btn-info btn-sm" onClick={()=>{addItem(e._id,e.quantity)}}>+</button>
                <button className="btn btn-danger btn-sm" style={{marginLeft:20}}  onClick={()=>decreaseItem(e._id,e.quantity)}>-</button>
              </td>
            </tr>)
            })
      }
          </tbody>
          <tfoot>
            <tr className="visible-xs">
              {/* <td className="text-center"><strong>Total 1.99</strong></td> */}
            </tr>
            <tr>
              <td></td>
              <td colspan="2" className="hidden-xs" style={{textAlign:'right',marginLeft:-20}}><strong>Total</strong></td>
              <td className="hidden-xs text-center"><strong> ${totalCost}</strong></td>
              <td><button  onClick={()=>{placeOrder()}} className="btn btn-success btn-block">Checkout</button></td>
            </tr>
          </tfoot>
        </table>
      }
      </div>
    </div>
    
 )
}

export default CartItems