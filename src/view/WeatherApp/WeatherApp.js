import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import mist from './mist.png'
import rain from './rain-sun.png'
import cloud from './cloud.png'
import clear from './clear.png'
import sun from'./sun.png'
import haze from './haze.png'
import './WeatherApp.css'

import imgsunrise from './sunrise.png'
import imgsunset from './sunset.png'
import wind from './wind1.png'
import visibility from './visibility.png'
import humidity from './humidity.png'
import pin from './pin.png'
import WeatherTells from "../../componentes/WeatherTells/WeatherTells";

const WeatherApp=()=>{
  const [storeweatherdata,setStoreweatherdata]=useState('')
  const [city,setCity]=useState()
  const [sunset,setSunset]=useState('')
  const [sunrise,setSunrise]=useState('')
  const [date,setDate]=useState()
  const [pune,setPune]=useState("Pune")
  const [sunstates,setSunstate]=useState()
  const [sunimg,setSunimg]=useState()
  useEffect(()=>{
    const sunstate=storeweatherdata?.weather?storeweatherdata?.weather[0]?.main:"";
    setSunstate(sunstate)

  },[weatherData])
  useEffect(()=>{
    if(sunstates=="Haze"){
      setSunimg(haze)
    }
    else if(sunstates=="Clouds"){
      setSunimg(cloud)
    }
    else if(sunstates=="Clear"){
      setSunimg(clear)
    }
    else if(sunstates=="Rain"){
      setSunimg(rain)
    }
   else if(sunstates=="Mist"){
      setSunimg(mist)
    }
    else{
      setSunimg(sun)
    }

  },[weatherData])
//  -------------------getting month------------
  const [months,setMonths]=useState([
    "january",'february',"March","April","May","June","July","August","September","October","November","December"

  ])
  const [monthname,setMonthname]=useState('')

  useEffect(()=>{
    
      const monthno=new Date().getMonth()
      if(monthno==0){
        setMonthname(months[0])
      }
      else if(monthno==1){
        setMonthname(months[1])
      }
      else if(monthno==2){
        setMonthname(months[2])
      }
      else if(monthno==3){
        setMonthname(months[3])
      }
      else if(monthno==4){
        setMonthname(months[4])
      }
      else if(monthno==5){
        setMonthname(months[5])
      }
      else if(monthno==6){
        setMonthname(months[6])
      }
      else if(monthno==7){
        setMonthname(months[7])
      }
      else if(monthno==8){
        setMonthname(months[8])
      }
      else if(monthno==9){
        setMonthname(months[9])
      }
      else if(monthno==10){
        setMonthname(months[10])
      }
      else{
        setMonthname(months[11])
      }
   

  },[weatherData])

  // ---------------getting day---------------------
  const [days,setDays]=useState([
    'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
  ])
  const [dayname,setDayname]=useState()
  useEffect(()=>{
    const day=new Date().getDay()
 
    if(day==0){
      setDayname(days[0])
    }
    else if(day==1){
      setDayname(days[1])
    }
    else if(day==2){
      setDayname(days[2])
    }
    else if(day==3){
      setDayname(days[3])
    }
    else if(day==4){
      setDayname(days[4])
    }
    else if(day==5){
      setDayname(days[5])
    }
    else{
      setDayname(days[6])

    }

  },[weatherData])
 

  useEffect(()=>{
    // const day=new Date().getDay()
 const date=new Date().getDate()
 setDate(date)
//  const month=new Date().getMonth()


  },[weatherData])
  console.log(city)
 
  useEffect(()=>{
    let sunsettime;
    let sunrisetime;
   sunsettime=storeweatherdata?.sys?.sunset;
  sunrisetime=storeweatherdata?.sys?.sunrise;
   setSunset(sunsettime);
   setSunrise(sunrisetime);

  },[weatherData])
  const sunsetrealtime=new Date(sunset* 1000).getHours();
  const sunsetminute=new Date(sunset* 1000).getMinutes();
  const sunriserealtime=new Date(sunrise * 1000).getHours();
  const sunriseminute=new Date(sunrise * 1000).getMinutes();
  
  console.log(sunriserealtime,sunsetrealtime)
  async function weatherData(){
  
    try{
     const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city==null?pune:city}&appid=f652964084c552e8c0492237a3fabd9c`)
     setStoreweatherdata(response.data)
    }
    catch(error){
      console.log(error)
     }
  
  
  }
  useEffect(()=>{
    weatherData()

  },[city])

  useEffect(()=>{
   weatherData();
  },[])


  
  return(
    <div className="weathercontainer">
      <div className="col-1">
        
        <div className="city">
           {/* <img src={pin} className="pin"/>  */}
           {city==null?pune:city}</div>
        <div className="text-align"><div className="date">{monthname}   {date} <br/> {dayname} </div></div>
      <div className="temp"> <div className="temperature">{((storeweatherdata?.main?storeweatherdata?.main?.temp:'')-273).toFixed(0)}°C</div>
        <div className="feels-like">Feels like {((storeweatherdata?.main?storeweatherdata?.main?.feels_like:'')-273).toFixed(0)}°C</div></div>

      </div>
      <div className="col-2">
        <img src={sunimg} className="sun"/>
        <div className="description">{sunstates}</div>

      </div>
      <div className="col-3">
      <input type="text" value={city} 
      placeholder="Search City"
      className="inputefield"
       onChange={(e)=>{
      setCity(e.target.value)
     }}/>
      <div className="weatherinfo"> 
       <WeatherTells img={imgsunrise} text={`sunrise ${sunriserealtime}:${sunriseminute}`}/>
        <WeatherTells img={imgsunset} text={`sunset  ${sunsetrealtime}:${sunsetminute}`}/>
        <WeatherTells img={wind} text={`${storeweatherdata?.wind?.speed}km/h`}/>
        <WeatherTells img={humidity} text={`${storeweatherdata?.main?storeweatherdata?.main?.humidity:''}℉`}/>
        <WeatherTells img={visibility} text={`${storeweatherdata?.visibility?storeweatherdata?.visibility:''}Mtr`}/>
      </div>

      </div>
    </div>





    // <div>
    //  <input type="text" value={city} onChange={(e)=>{
    //   setCity(e.target.value)
    //  }}/>
    //   {/* <h1>City:{storeweatherdata.name}</h1>
    // <h1>temperature:{((storeweatherdata.main.temp)-273).toFixed(2)}°C</h1>
    // <h1>discription:{storeweatherdata?.weather[0]?.description}</h1> */}

    //       <h1>City:{storeweatherdata?.name?storeweatherdata.name:""}</h1>
    // <h1>temperature:{((storeweatherdata?.main?storeweatherdata?.main?.temp:"")-273).toFixed(2)}°C</h1>
    // <h1>discription:{storeweatherdata?.weather?storeweatherdata?.weather[0]?.main:""}({storeweatherdata?.weather?storeweatherdata?.weather[0]?.description:""})</h1>
    // {/* <h1>description{weatherdes}</h1> */}
    // <h1>visibility:{storeweatherdata?.visibility?storeweatherdata?.visibility:''}</h1>
    // <h1>
    //   sunset:{sunsetrealtime}
    
    // </h1>
    // <h1>  sunrise:{sunriserealtime}</h1>
    // <h1>monthname:{monthname}</h1>
    // <h1>date:{date}</h1>
    // <h1>dayname:{dayname}</h1>
    // <h1>wind speed:{storeweatherdata?.wind?.speed}</h1>
    // </div>
  )
}
export default WeatherApp;