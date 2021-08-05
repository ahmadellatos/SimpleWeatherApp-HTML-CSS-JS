const cityname = document.querySelector('.cityname')
const temp = document.querySelector('.temp')
const icon = document.querySelector('.iconweather')
const desc = document.querySelector('.desc')
const form = document.querySelector('#form-weather')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const cityQuery = form.elements.searchbar.value
    getSearchWeather(cityQuery)
    form.elements.searchbar.value = ''
})



//GET DEFAULT WEATHER BASED ON LAT AND LONG
const getDefaultWeather = async (position) => {
    const lat = position.coords.latitude
    const long = position.coords.longitude
    // console.log(lat, long)
    try {
        const getDefaultData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3acd73f044aa44db0d5e60846c50dc55`)
        cityname.innerText = `Weather in ${getDefaultData.data.name}`
        const celcius = getDefaultData.data.main.temp - 273.15
        icon.src = `http://openweathermap.org/img/wn/${getDefaultData.data.weather[0].icon}@2x.png`
        desc.innerText = getDefaultData.data.weather[0].description
        temp.innerText = `${celcius.toFixed(1)}°C`

    } catch (e) {
        console.log(e)
        alert("Nama Kota Salah / Tidak ada")
    }

}

//GET GEOLOCATION LAT AND LONG
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getDefaultWeather);
} else {
    alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
}

//GET LOCATION BASED ON SEARCH
const getSearchWeather = async (search) => {
    try {
        const getSearchData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=3acd73f044aa44db0d5e60846c50dc55`)
        cityname.innerText = `Weather in ${getSearchData.data.name}`
        const celcius = getSearchData.data.main.temp - 273.15
        temp.innerText = `${celcius.toFixed(1)}°C`
        icon.src = `http://openweathermap.org/img/wn/${getSearchData.data.weather[0].icon}@2x.png`
        desc.innerText = getSearchData.data.weather[0].description
    } catch (e) {
        console.log(e)
        alert("Nama Kota Salah / Tidak ada")
    }

}