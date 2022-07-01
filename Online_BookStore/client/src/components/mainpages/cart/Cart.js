import React, {useContext, useState, useEffect,createContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'
import PayPalButton from './PaypalButton'
import { useHistory } from "react-router-dom";

import Register from "./register"; 


export const UserContext = React.createContext();
const money = createContext();

function Cart() {
    let history=useHistory();
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)


    
    const [ user, setUser] = useState({
        name: "",
        email:"",
        address:"",
        city: "",
        state:"",
        zipcode:""
    })

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) =>{
        await axios.patch('/user/addcart', {cart}, {
            headers: {Authorization: token}
        })
    }


    const increment = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) =>{
        cart.forEach(item => {
            if(item._id === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async(payment) => {
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])
        alert("You have successfully placed an order.")
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 





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
              
            } catch (err) {
                alert(err.response.data.msg)
            }
        }



    return (
        <div>
            {
                cart.map(product => (
                    <div className="detail cart" key={product._id}>
                        <img src={product.images.url} alt="" />

                        <div className="box-detail">
                            <h2>{product.title}</h2>

                            <h3>₹  {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>

                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            
                            <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
                                X
                            </div>
                        </div>

                        <div className="register">
                        <hr></hr>
                        <br></br>
                        <h1>Shipping Address</h1>
        <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
        <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
        <input type="text" name="address" value={user.address} placeholder="Your Address" onChange={handleChange}></input>
        <input type="text" name="city" value={user.city} placeholder="Your City" onChange={handleChange}></input>
        <input type="text" name="state" value={user.state} placeholder="Your State" onChange={handleChange}></input>
        <input type="text" name="zipcode" value={user.zipcode} placeholder="Zip /Postal Code" onChange={handleChange}></input>
        <div className="button" onClick={register}>Save the Details</div>
        </div>
            
                    </div>
                ))
            }

            <div className="total">
                <h3>Total:  ₹ {total}</h3>
                <money.Provider value={total}>
                <PayPalButton />
            </money.Provider>
            </div>
          
        </div>
    )
}

export default Cart
export {money}