const url = 'https://open-weather13.p.rapidapi.com/';
let country = document.querySelector("#country");
const btn = document.querySelector(".btn");
// make dropdowns for all country codes
for(let countryCode in countryList){
    const newOption = document.createElement("option");
    newOption.innerText = countryList[countryCode];
    newOption.value = countryCode;
    if(newOption.innerText === "India" && newOption.value === "IN"){
        newOption.selected = true;
    }
    country.append(newOption);
}

// add event listener to change flag on changing country
country.addEventListener('change',(evt)=>{
    changeFlag(evt.target);
});
// function to change flag
const changeFlag = (element)=>{
    const countryCode = element.value;
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = document.querySelector(".flag");
    img.src = newsrc;
}

// on button click
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '745cc7bf1emsh109b556f9b56104p145148jsn9db7a47e31d2',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };
    async function fetchdata(){
        try {
            country = document.querySelector("#country").value;
            let city = document.querySelector(".city").value;
            let city1 = document.querySelector(".city1");
            let temp_in_text = document.querySelector(".temp_in_text");
            let temperature = document.querySelector(".weather_now h1");
            let feels_like = document.querySelector(".feels_like");
            let haze = document.querySelector(".haze");
            let maxTemp_value= document.querySelector(".maxTemp_value");
            let Humidity_value = document.querySelector(".Humidity_value");
            let Wind_value = document.querySelector(".Wind_value");
            let cloud = document.querySelector(".cloud");
            if(city != ""){
                let finalurl = `${url}city/${city}/${country}`;
                const response = await fetch(finalurl, options);
                const result = await response.json();
                console.log(result);
                let max_temp = Math.floor((result.main.temp_max - 32)*(5/9));
                let temp = Math.floor((result.main.temp - 32)*(5/9));
                let humidity = result.main.humidity;
                let temp_feels_like = Math.floor((result.main.feels_like - 32)*(5/9));
                let wind_speed = result.wind.speed;
                if(temp>45){
                    temp_in_text.innerText = "Excessive Heat";
                }else if(temp<=15 && temp>=10){
                    temp_in_text.innerText = "Cold";
                }else if(temp<10){
                    temp_in_text.innerText = "Excessive Cold";
                }else{
                    temp_in_text.innerText = "Normal Temperature";
                }
                let deg = '\u00B0';
                city1.innerText = city;
                temperature.innerText = `${temp} ${deg}C`;
                feels_like.innerText = `Feels like ${temp_feels_like} ${deg}C`;
                maxTemp_value.innerText = ` ${max_temp} ${deg} c`;
                Humidity_value.innerText = ` ${humidity}%`;
                Wind_value.innerText = ` ${wind_speed}kph`;
                cloud.innerText = result.weather[0].description;
            }else{
                alert("Enter city!");
            }
        } catch (error) {
            console.error(error);
        }
    }
    fetchdata();
})




