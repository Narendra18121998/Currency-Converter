import React, { useState,useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const[amount,setAmount]= useState(1);
  const[fromcurrency,setFromCurrency]=useState("USD");
  const[tocurrency,setToCurrency]=useState("INR");
  const[exchangerate,setExchangeRate] = useState({});
  const[convertedamount,setConvertedAmount] = useState(0);

  useEffect(()=>{
    const apicall=async()=>{
    try{
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromcurrency}`)
      setExchangeRate(response.data.rates)
      
    }
    catch(error){
      console.log('Error occured while calling the api' , error)
    }
    }
    apicall();
  },[fromcurrency])
  
  //console.log(exchangerate)
  //console.log(Object.keys(exchangerate))  
  
  useEffect(()=>{
    const conversionRate = exchangerate[tocurrency]
    //console.log(conversionRate)
    const converted = amount*conversionRate;
    setConvertedAmount(converted.toFixed(2));
  }  ,[amount,exchangerate,tocurrency,fromcurrency])  

  const handleClick=(e)=>{
    const{name,value} = e.target;
    switch(name){
      case 'amount':
        setAmount(value);
        break;
      case 'fromcurrency':
        setFromCurrency(value);
        break;
      case "tocurrency":
        setToCurrency(value);
        break;   
      default:
    }
  }

  
  return (
    <div className='card'>
        <img src="/Images/logo.png" alt="logo" />
        <h1 className='heading'>Currency Converter</h1>

        <div className="currency-exchange">
            <div className="input-container">
                <label htmlFor="amount" className='input-label'>Amount:</label>
                <input type="number" name="amount" value={amount} onChange={handleClick} className='input-field'/>
            </div>

            <div className="fromcurrency">
              <label htmlFor="fromcurrency">FromCurrency:</label>
              <select name="fromcurrency" value={fromcurrency} onChange={handleClick}>
                {
                  Object.keys(exchangerate).map((curEle,index)=>{
                   return <option key={index}>{curEle}</option>
                })
                }
              </select>     
            </div>

            <div className="tocurrency">
              <label htmlFor="toCurrency">ToCurrency:</label>
              <select name="tocurrency" value={tocurrency} onChange={handleClick}>
                {
                  Object.keys(exchangerate).map((curEle,index)=>{
                   return <option key={index}>{curEle}</option>
                })
                }
              </select>
            </div>  
            
        </div>

        <div className="output">
              <h2><b>Converted Amount:{convertedamount}</b></h2>
        </div>

    </div>
  )
}

export default App