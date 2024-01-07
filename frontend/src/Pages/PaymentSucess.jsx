import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const PaymentSuccess=()=>{
    const {orderId}=useParams()
    const [order,setOrder]=useState(null)
    useEffect(()=>{
     axios.get('http://127.0.0.1:5000/get_order_data/'+orderId).then(response=>{
        console.log(response)
        if(response.data.status)
        {
         console.log('11111')
          setOrder(response.data.data)
        }
     })
    },[])
    return (
       <div className="container">
         <h2 className="d-flex justify-content-center mt-4 mb-5">Thanks for ordering! Your order is placed successfully</h2>
        {order && <div className="row mb-5">
         <div className="col-md-6">
          <div><strong>Delivery Address:</strong> {order.delivery_address.street},{order.delivery_address.city},{order.delivery_address.state},{order.delivery_address.country},{order.delivery_address.zip}</div>
          <div><strong>Delivering To:</strong>{order.user_data.username}</div>
         </div>

         <div className="col-md-6" style={{textAlign:"right"}}>
         <div><strong>Order Id:</strong> {orderId}</div>
         <div><strong>Data Ordered:</strong> {order.createdOn.split(' ')[0]}</div>
         </div>
        
         </div>}
         {order &&
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th style={{width:"50%",backgroundColor:'#808080'}}>Product</th>
              <th style={{width:"10%",backgroundColor:'#808080'}}>Price</th>
              <th style={{width:'8%',backgroundColor:'#808080'}}>Quantity</th>
              <th style={{width:"22%",backgroundColor:'#808080'}} className="text-center">Subtotal</th>
              <th style={{width:"10%",backgroundColor:'#808080'}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {order.items_data.map((e,i)=>{
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
                 Order Placed
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
              <td className="hidden-xs text-center"><strong> ${order.total_amount[0]}</strong></td>
              {/* <td><button  onClick={()=>{placeOrder()}} className="btn btn-success btn-block">Checkout</button></td> */}
            </tr>
          </tfoot>
        </table>
      }
</div> 
    )
}

export default PaymentSuccess