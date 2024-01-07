import React, { useContext } from "react";
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'
import { ShopContext } from "../../Context/ShopContext";
const Popular=()=>{
    const {all_product}=useContext(ShopContext)
    console.log('800',all_product)
    var womenCategory=0;
    return(
        <div className='popular'>
            <h1>Popular In Women </h1>
            <hr/>
            <div className="popular-item">
                {all_product.map((item,i)=>{
                    if(item.category==='women' && womenCategory<4)
                    {
                        womenCategory++;
                    return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    }
                })}

            </div>

        </div>
    )
}
export default Popular