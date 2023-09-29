import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


const WeatherApp=()=>{
  const [storeweatherdata,setStoreweatherdata]=useState('')
  const [city,setCity]=useState()
  const [sunset,setSunset]=useState('')
  const [sunrise,setSunrise]=useState('')
  const [date,setDate]=useState()
//  -------------------getting month------------
  const [months,setMonths]=useState([
    "january",'february',"March","April","May","June","July","August","Sep.","Oct.","Nov.","dec."

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
    'sunday','monday','tuesday','wednesday','thusday','firday','saturday'
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
  const sunsetrealtime=new Date(sunset* 1000).toLocaleTimeString()
  const sunriserealtime=new Date(sunrise * 1000).toLocaleTimeString()
  console.log(sunriserealtime,sunsetrealtime)
  async function weatherData(){
  
    try{
     const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f652964084c552e8c0492237a3fabd9c`)
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
    <div>
     <input type="text" value={city} onChange={(e)=>{
      setCity(e.target.value)
     }}/>
      {/* <h1>City:{storeweatherdata.name}</h1>
    <h1>temperature:{((storeweatherdata.main.temp)-273).toFixed(2)}°C</h1>
    <h1>discription:{storeweatherdata?.weather[0]?.description}</h1> */}

          <h1>City:{storeweatherdata?.name?storeweatherdata.name:""}</h1>
    <h1>temperature:{((storeweatherdata?.main?storeweatherdata?.main?.temp:"")-273).toFixed(2)}°C</h1>
    <h1>discription:{storeweatherdata?.weather?storeweatherdata?.weather[0]?.main:""}({storeweatherdata?.weather?storeweatherdata?.weather[0]?.description:""})</h1>
    {/* <h1>description{weatherdes}</h1> */}
    <h1>visibility:{storeweatherdata?.visibility?storeweatherdata?.visibility:''}</h1>
    <h1>
      sunset:{sunsetrealtime}
    
    </h1>
    <h1>  sunrise:{sunriserealtime}</h1>
    <h1>monthname:{monthname}</h1>
    <h1>date:{date}</h1>
    <h1>dayname:{dayname}</h1>
    </div>
  )
}
export default WeatherApp;