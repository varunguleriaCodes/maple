import React, { useContext } from "react";
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'
import { ShopContext } from "../../Context/ShopContext";
const NewCollections=()=>{

  const {all_product}=useContext(ShopContext)
return(
    <div className="new-collections">
     <h1>New Collections</h1>
     <hr/>
     <div className="collections">
      {all_product.map((item,i)=>{
        if(item?.new_collection){
        return <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        }
      })}
     </div>
    </div>
)
}
export default NewCollections
