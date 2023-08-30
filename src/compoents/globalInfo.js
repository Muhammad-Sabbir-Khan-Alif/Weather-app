import React, { useEffect, useState } from "react";
import '../index.css'
function GlobalInfo() {
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [globalWeather, setGlobalWeather] = useState("");
    const handleInputValue = (event) => {
        setInputValue(event.target.value)
    }
    const handleSwap = () => {
        setSearchValue(inputValue);
    }
    useEffect(() => {
        const apiKey = "b09ed8346a31fc4e4a07640b884f6fb2"
        const dataURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}`
        const fetchData = async () => {
            const requestGlobally = await fetch(dataURL);
            const responseGlobally = await requestGlobally.json();
            setGlobalWeather(responseGlobally);
        }
        fetchData();
    }, [searchValue])

    return (
        <div>
            <h2 className="global-heading">Global Information</h2>
            <div className="global-devider">

            </div>
            <div className="search-div">
                <input type="text" name="search" className="input" placeholder="Enter area's name..." value={inputValue} onChange={handleInputValue} />
                <button className="search-btn" onClick={handleSwap}>Search</button>
            </div>
            {searchValue !== "" && globalWeather.sys && globalWeather.sys.country ? (
                <h4 className="areaName-global">{searchValue} / {globalWeather.sys.country}</h4>
            ) : (<h4 className="areaName-global">Search by area's name</h4>)}
            <div className="info-devider">

            </div>
            <div className="globalInfo-div">
                {globalWeather.main && globalWeather.main.temp ? (
                    <p>Tempreture : {(globalWeather.main.temp - 272.15).toFixed(2)}<sup>o</sup>C</p>
                ) : searchValue === "" ? (<p>Tempreture : Enter area's name</p>) : (<p>Tempreture : Loading...</p>)}
                {globalWeather.weather && Array.isArray(globalWeather.weather) && globalWeather.weather[0] && globalWeather.weather[0].description ? (
                    <p>Status : {globalWeather.weather[0].description}</p>
                ) : searchValue === "" ? (<p>Status : Enter area's name</p>) : (<p>Status : Loading...</p>)}
                {globalWeather.main && globalWeather.main.feels_like ? (
                    <p>Feels like : {(globalWeather.main.feels_like - 272.15).toFixed(2)}<sup>o</sup>C</p>
                ) : searchValue === "" ? (<p>Feels like : Enter area's name</p>) : (<p>Feels like : Loading...</p>)}
                {globalWeather.main && globalWeather.main.temp_max ? (
                    <p>Max temp : {(globalWeather.main.temp_max - 272.15).toFixed(2)}<sup>o</sup>C</p>
                ) : searchValue === "" ? (<p>Max temp : Enter area's name</p>) : (<p>Max temp : Loading...</p>)}
                {globalWeather.main && globalWeather.main.temp_min ? (
                    <p>Min temp : {(globalWeather.main.temp_min - 272.15).toFixed(2)}<sup>o</sup>C</p>
                ) : searchValue === "" ? (<p>Min temp : Enter area's name</p>) : (<p>Min temp : Loading...</p>)}
                {globalWeather.visibility ? (
                    <p>Visiblity : {globalWeather.visibility}mi</p>
                ) : searchValue === "" ? (<p>Visibility : Enter area's name</p>) : (<p>Visiblity : Loading...</p>)}
                {globalWeather.wind && globalWeather.wind.speed ? (
                    <p>Windspeed : {globalWeather.wind.speed}Km/h</p>
                ) : searchValue === "" ? (<p>Windspeed : Enter area's name</p>) : (<p>Windspeed : Loading...</p>)}
            </div>

        </div>
    )
}
export default GlobalInfo;