import React, { useContext,useEffect, useState } from "react";
import './CSS/ShopCategory.css'
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png"
import Item from '../Components/Item/Item'
import axios from "axios";
const ShopCategory=(props)=>{
    const {all_product,userData}=useContext(ShopContext)
    const [itemCategory,setItemCategory]=useState([])
    const [skip,setSkip]=useState(12)
    const [totalCount,setTotalCount]=useState(0)
    const [disabledButton,setDisabledButton]=useState(false)
    useEffect(()=>{
        axios.get('http://127.0.0.1:5000/items-filter?category='+props.category).then((response)=>{
            console.log('1212',response)
            if(response.data.status)
            {
                setItemCategory(response.data.data.items)
                setTotalCount(response.data.data.total_count)
                console.log('19',totalCount)
                if(totalCount==skip) setDisabledButton(true) 
            }
        })
    },[props.category])
    const getMoreItems=()=>{
        axios.get('http://127.0.0.1:5000/items-filter?category='+props.category+'&skip='+skip).then((response)=>{
            console.log('1212',response)
            if(response.data.status)
            {
                setSkip(skip+12)
                if(totalCount==skip) setDisabledButton(true) 
                var allItems=[...itemCategory,...response.data.data.items]
                setItemCategory(allItems)
            }
        })
    }
    console.log('8',userData);
    return(
        <div className="shop-category">
            <img className="shopcategory-banner" src={props.banner} alt='' />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-{skip}</span> out of {totalCount} products
                </p>
             <div className="shopcategory-sort">
                Sort by <img src={dropdown_icon} alt="" />
                </div>   
            </div>
            <div className="shopcategory-products">
                {
                itemCategory.map((item,i)=>{  
                    return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })
                }
            </div>
            <button className="shopcategory-loadmore" onClick={getMoreItems} disabled={disabledButton}>
                Explore More
            </button>
        </div>
    )
}

export default ShopCategory