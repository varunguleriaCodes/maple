import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const AllOrders=()=>{
    const {userData}=useContext(ShopContext)
    const [orders,setOrders]=useState(null)
    useEffect(()=>{
        if(userData!==null){
        axios.get('http://127.0.0.1:5000/all_order_details_user/'+userData._id).then((response)=>{
            if(response?.data?.status){
               setOrders(response?.data?.data)
            }
    })}
    },[])
    const formatDate =(dateString=>{
        return new Date(dateString).toLocaleDateString();
    })
    return(
        <div className="container mt-5">
           {orders==null && userData===null &&
              <h4 style={{marginTop:150,marginBottom:150}} className="d-flex justify-content-center">Please Login to view your orders</h4> }
            <div className="row">
            {orders!==null && orders.map((order,i)=>{
                    return( 
                        <div className="col-lg-4 col-md-6 mb-3">
                    <Card style={{ width: '18rem' }} class='m-2'key={i}>
                    <Card.Img variant="top" src={order.items_data[0].image} />
                    <Card.Body>
                      <Card.Title>Order {i+1}</Card.Title>
                      <Card.Text>
                            <span  style={{fontWeight:"bold"}}>ID:</span> {order._id}
                            <div class="d-flex justify-content-center mt-1" style={{fontWeight:"bold"}}>Items</div>
                            {order.items_data.map((item,i)=>{
                                return (
                                    <div>
                                        {item.name} <span style={{fontWeight:"bold"}}>x {item.quantity}</span>
                                    </div>
                                )
                             })}
                        <div><span style={{fontWeight:"bold"}}>Date Ordered</span> {formatDate(order.createdOn.split(' ')[0])}</div>
                      </Card.Text>
                      <div style={{fontWeight:"bolder"}}>Total: ${order.total_amount[0]}</div>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                    </div>
                        )   
                                           
            })
        }
            </div>
        </div>
    )
}
export default AllOrders