import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useHistory } from "react-router-dom"
import PayPalButton from "./PaypalButton";
import { Amount } from "./Cart"

import { useLocation } from "react-router-dom";
import { useEffect } from "react";



const Register = () => {

    const history = useHistory()
    const [ user, setUser] = useState({
        name: "",
        email:"",
        address:"",
        city: "",
        state:"",
        zipcode:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

  
    const register = async e =>{
        e.preventDefault()
        try {
            const { name, email, address, city,state, zipcode } = user
            if( name && email && address && city && state && zipcode ){
            await axios.post('/user/address', {...user})

            }
            window.location.href = "/cart";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

   
   

    return (
       

       
        <div className="register">
        <h1>Shipping address</h1>
        <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
        <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
        <input type="text" name="address" value={user.address} placeholder="Your Address" onChange={handleChange}></input>
        <input type="text" name="city" value={user.city} placeholder="Your City" onChange={handleChange}></input>
        <input type="text" name="state" value={user.state} placeholder="Your State" onChange={handleChange}></input>
        <input type="text" name="zipcode" value={user.zipcode} placeholder="Zip /Postal Code" onChange={handleChange}></input>
        <div className="button" onClick={register}>Save the Details</div>
            
            <div className="button" onClick={() => history.push("/pay")}>Login</div>
        
        </div>
    )
}

export default Register