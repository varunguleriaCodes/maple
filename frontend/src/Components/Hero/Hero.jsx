import React,{useState} from "react";
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

const Hero =()=>{

 return (
    <div className="hero col-12">
        <div className="hero-left col-md-6 col-sm-6">
            <h2>New Arrivals Only</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Collections</p>
                <p>For Everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>
                    Latest Collection
                </div>
                <img src={arrow_icon} alt=""/>
            </div>
        </div>
        <div className="hero-right col-md-6 col-sm-6">
            <img src={hero_image} alt=""/>
        </div>
    </div>
 )
}
export default Hero

