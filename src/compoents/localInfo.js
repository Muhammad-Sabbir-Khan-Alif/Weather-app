import React, { useEffect, useState } from "react";
import '../index.css'
function LocalInfo() {
    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState("");
    const [weather, setweather] = useState("");
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const dateday = date.getDate();


    useEffect(() => {
        const toClear = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(toClear);
    }, [date]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
                const getLocation = async () => {
                    const request = await fetch(url);
                    const response = await request.json();
                    setLocation(response)
                }

                getLocation();
            })
        }
    }, [])

    useEffect(() => {
        if (location.address && location.address.town) {
            const apiKey = "fe3f6e22b8e6bb528c8ab853a3a61ce4";
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${location.address.town}&appid=${apiKey}`
            const getData = async () => {
                const requestWeather = await fetch(weatherURL);
                const responseWeather = await requestWeather.json();
                setweather(responseWeather);
            }
            getData();
        }
    }, [location.address])

    const nameDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div>
            <h2 className="local-heading">Local Informations</h2>
            <div className="local-devider">

            </div>
            <h3 className="time">System time is : {date.toLocaleTimeString()}</h3>
            {location.address && location.address.town ? (
                <h3 className="town">Town : {location.address.town}</h3>
            ) : (<p>Town : Address is loading...</p>)}
            {location.address && location.address.state ? (
                <h3 className="divition">Divition : {location.address.state}</h3>
            ) : (<p>Divition : Address is loading...</p>)}
            {location.address && location.address.state_district ? (
                <h3 className="district">District : {location.address.state_district}</h3>
            ) : (<p>District : Address is loading...</p>)}
            {location.address && location.address.country ? (
                <h3 className="country">Country : {location.address.country}</h3>
            ) : (<p>Country : Address is loading...</p>)}

            <div className="tempreture-div">
                {weather.main && weather.main.temp ? (
                    <h2>Tempreture : {weather.main.temp - 272.15}<sup>o</sup>C</h2>
                ) : (<h2>Tempreture : Your tempreture is loading...</h2>)}
                {weather.weather&& Array.isArray(weather.weather) && weather.weather[0] && weather.weather[0].description ? (
                    <h2>Status : {weather.weather[0].description}</h2>
                ) : (<h2>Status : Your weather status is loading...</h2>)}
                {weather.main && weather.main.temp_max ? (
                    <p className="max-temp">Max temp : {weather.main.temp_max - 272.15}<sup>o</sup>C</p>
                ) : (<p>Max temp : Max temp of this area is loading...</p>)} <span> | </span>
                {weather.main && weather.main.temp_min ? (
                    <p className="min-temp">Min temp : {weather.main.temp_min - 272.15}<sup>o</sup>C</p>
                ) : (<p>Min temp : Min temp of this area is loading...</p>)}
                <p>{nameDay[day]}| {dateday} | {month} | {year}</p>
            </div>
        </div>
    )
}
export default LocalInfo;