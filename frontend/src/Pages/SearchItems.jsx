import axios from "axios";
import React, { useState } from "react";
import './CSS/Search.css'
import Item from "../Components/Item/Item";
const SearchItems=()=>{
    const [search,setSearch]=useState('')
    const [errorMsg,showErrorMsg]=useState(false)
    const [searchData,setSearchData]=useState(null)
    const [count,setCount]=useState(0)
    const searchItem=()=>{
        if(search===''){ 
            showErrorMsg(true)
            return;}
            showErrorMsg(false)
        axios.get('http://127.0.0.1:5000/items-filter?name='+search).then(response=>{
            console.log(response)
            if(response.data.status)
            {
              setSearchData(response.data.data.items)
              setCount(response.data.data.total_count)
            }
        })
    }
    return (
        <div>
            <div className="main-search">
                <div className="form-group has-feedback has-search">
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                    <span className="d-flex">
                    <input type="text" className="form-control" placeholder="Search" onChange={(e)=>{setSearch(e.target.value)}}/>
                    <button onClick={()=>{searchItem()}} className="btn btn-primary mt-1" style={{height:39}}>Search</button>
                    </span>
                    {errorMsg && <p className="ml-2" style={{color:'red',marginLeft:10}}>Please Enter Something to search</p>}
                    {count==0 && errorMsg==false && <p className="ml-2" style={{color:'red',marginLeft:10}}>No such item found</p>}
                </div>
                <div className="container mt-5">
                   <div className="row">
                {
                    searchData!==null && 
                        searchData.map((item,i)=>{  
                            return (
                            <div className="col-lg-4 col-md-6 mb-3">
                             <Item key={i} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                            </div>
                        )
                        })
                }
                    </div>
                </div>
                </div>
            </div>
    )
}
export default SearchItems