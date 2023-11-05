let input = document.getElementById("input")
let searchBtn = document.getElementById("search-btn")
let temperatureElement = document.getElementById("temperature")
let place = document.getElementById("country-city")
let img = document.getElementById("img")
let km = document.getElementById("km")
let water = document.getElementById("water")
let feelsLike = document.getElementById("feels-like")
let time = document.getElementById("time");
let month = document.getElementById("date")
let container = document.getElementById("container")
let city;

input.addEventListener('keyup',(e)=>{
    let value = e.target.value.trim();
    city = value;
})

searchBtn.addEventListener("click",(e)=>{
   fetch(`http://api.weatherapi.com/v1/current.json?key=b1d8cfd5385a4a0a9cd201655230511&q=${city}&aqi=n`
   ).then((x)=>{
    if(!x.ok){
        return window.alert("Location not found!")
    }
    return x.json()
   }).then((x)=>{
    renderElement(x.current.temp_c,x.location.name,x.location.country,x.current.condition.icon,x.current.wind_kph,x.current.humidity,x.current.feelslike_c,x.location.localtime)
    backgroundRender(x.current.condition.text)
    })
})

function renderElement(temperature,countryCity,country,icon,kph,humidityRes,feelsLikeRes,clock){
    temperatureElement.innerHTML = temperature + "°C";
    place.innerHTML = country + "," + countryCity 
    img.src = `https:${icon}`;
    km.innerHTML = `<i class="fa-solid fa-wind" style="color: #ffffff;"></i>` + kph + "KM/H"
    water.innerHTML = `<i class="fa-solid fa-water" style="color: #ffffff;"></i>` + humidityRes
    feelsLike.innerHTML = "Feels like: " + feelsLikeRes + "°C"
    time.innerHTML = clock.slice(11)
    month.innerHTML = clock.slice(0,10)
}

function backgroundRender(a){
    console.log(a);
    if(a == "Sunny"){
        container.style.background = "#FC9601"
    }
    else if(a == "Partly cloudy"){
        container.style.background = "#9aa6a6"
    }
    else if(a == "Light drizzle" || a == "Light rain" || a == "Patchy light drizzle"){
        container.style.background = "#5791d4"
    }
    else if(a == "Light snow"){
        container.style.background = "rgb(200, 194, 194)"
    }
}
