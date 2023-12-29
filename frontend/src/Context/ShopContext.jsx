import React,{createContext, useState,useEffect} from "react";
// import all_product from '../Components/Assets/all_product'
import axios from 'axios'
export const ShopContext=createContext(null)
// const getDefaultCart=()=>{
//     let cart={}
//     for(let i=0;i<all_product.length+1;i++)
//     {
//         cart[i]=0;
//     }
//     return cart;
//  }

const ShopContextProvider =(props)=>{
    // const [cartItems,setCartItems]= useState(getDefaultCart())
    // const addToCart=(itemId)=>{
    //   setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
    // }
    // const removeFromCart=(itemId)=>{
    //     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    // }
    const [all_product,set_all_product]=useState([])
    const [userData,setUserData]=useState(null)
    useEffect(() => {
        const fetchItemsData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:5000/items');
            return response;
          } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
          }
        };
    
        fetchItemsData().then(response=>{
            set_all_product(response.data.data)
        }
        ).catch(error=>{
            console.log(error)
        });
      }, []);
    const contextValue={all_product,userData,setUserData}
 return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
 )
}
export default ShopContextProvider