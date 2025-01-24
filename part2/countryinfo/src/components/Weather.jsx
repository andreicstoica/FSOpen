/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import axios from "axios"

const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null)
    const apiKey = import.meta.env.VITE_API_KEY

    useEffect(() => {
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
        .then(response => 
            setWeather(response.data)
        ) 
    }, [capital, apiKey])

    return (
        <>
            {weather != null && (
                <div>
                    <p>temperature is currently {weather.main.temp}°C</p>
                    <p>Current conditions: {weather.weather[0].description}</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
                </div>
            )}
            {weather === null && <p>Weather data not available</p>}
        </>
    )
}

export default Weather