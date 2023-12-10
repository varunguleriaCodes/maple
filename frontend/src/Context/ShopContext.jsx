import React,{createContext, useState} from "react";
import all_product from '../Components/Assets/all_product'
export const ShopContext=createContext(null)

const getDefaultCart=()=>{
    let cart={}
    for(let i=0;i<all_product.length+1;i++)
    {
        cart[i]=0;
    }
    return cart;
 }

const ShopContextProvider =(props)=>{
    const [cartItems,setCartItems]= useState(getDefaultCart())
 const contextValue={all_product,cartItems}
 
 return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
 )
}
export default ShopContextProvider