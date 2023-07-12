import hot from "./assests/hot.avif"
import coldBg from "./assests/cold.avif"
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";




function App() {
  const [weather,setWeather]=useState(null);
  const [units,setUnits]=useState('metric')
  const [city,setCity]=useState("Paris")
  const [bg,setBg]=useState(hot)

  useEffect(()=>{
    const fetchWeatherData=async()=>{
      const data= await getFormattedWeatherData(city,units)
      setWeather(data)

      //dynamic bg

      const threshold=units==="metric"?25:60;
      if(data.temp<=threshold) setBg(coldBg)
      else setBg(hot)

    }
    fetchWeatherData();
  },[units,city]);

  const handleClick=(e)=>{
    const button =e.currentTarget;
    const currentUnit=button.innerText.slice(1);
    const isCel=currentUnit==='C';
    button.innerText=isCel?"°F":"°C"
    setUnits(isCel?"metric":"imperial")

  }


  const enterKeyPressed=(e)=>{
    if (e.keyCode===13){
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }




  return (
    <div className="app" style={{backgroundImage:`url(${bg})`}}>
      <div className="overlay">
        {weather &&(
          <div className="container">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city.." />
            <button onClick={(e)=>handleClick(e)}>°F</button>

          </div>
          <div className="section section__temperature">
            <div className="icon">
              <h3>{`${weather.name}, ${weather.country}`}</h3>
              <img src={weather.iconURL} alt="" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temperature">
              <h1>{`${weather.temp.toFixed()} °${units === 'metric'?'C':'F'}`}</h1>
            </div>
          </div>

          {/* bottom Descriptions */}

          <Descriptions weather={weather} units={units}/>

        </div>
        )}
        
      </div>
           
    </div>
  );
}

export default App;
