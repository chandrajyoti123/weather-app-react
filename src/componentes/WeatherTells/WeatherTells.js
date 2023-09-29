import { text } from '@fortawesome/fontawesome-svg-core';
import './WeatherTells.css'
import sunrise from './sunrise.png'
const WeatherTells=({img,text})=>{
    return(
        <div className="weathertells">
            <span><img src={img} className='imgofweathertells'/></span>
            <span className='textofweathertells'>{text}</span>

        </div>
    )

}
export default WeatherTells;