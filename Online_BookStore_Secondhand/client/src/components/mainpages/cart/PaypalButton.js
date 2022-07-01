import React, { useContext } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import "./register.css"
import { money } from "./Cart"

const   PayPalButton = () => {
                const onSuccess = (payment) => {
  
                    		console.log("The payment was succeeded!", payment);
                            
                            this.props.tranSuccess(payment)
                }
    

const  phonePrice =useContext(money);
  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }
   
    const options = {
        key: Your_Key,
      currency: "INR",
      amount: amount * 100,
      name: "Online BookStore",
      description: "Thanks for purchasing",

      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert("Payment Successfully");
      },
      prefill: {
        name: "Online BookStore",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };


  return (
    <>
     
      <Divider />
     
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                <div className="button"  onClick={() => displayRazorpay((phonePrice))}>Proceed to Payment</div>         
             
            </div>
    </>
  );
};

export default  PayPalButton;
