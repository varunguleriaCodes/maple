import React,{createContext, useState,useEffect} from "react";
import axios from 'axios'
export const ShopContext=createContext(null)

const ShopContextProvider =(props)=>{

    const [all_product,set_all_product]=useState([])
    const [userData,setUserData]=useState(null)
    const [cartData,setCartData]=useState(null)
    useEffect(() => {
      if(localStorage.getItem('user_data'))
      {
        const localStorageUserData=JSON.parse(localStorage.getItem('user_data'))
        setUserData(localStorageUserData)
      }
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
    const contextValue={all_product,userData,setUserData,cartData,setCartData}
 return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
 )
}
export default ShopContextProvider