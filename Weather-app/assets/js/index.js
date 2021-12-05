const key = '6rzaOd0oiQxgsVn46eZFLEtbBkArHFLi'

const DailyForecasts = async (id) => {
    const baseUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/"
    const query = `${id}?apikey=${key}`;


    const res = await fetch(baseUrl + query);
    const data = await res.json();

    return data;
}

const getCity = async (city) => {
    const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
    const query = `?apikey=${key}&q=${city}&language=vi`;

    const res = await fetch(baseUrl + query);
    const data = await res.json();

    return data[0];
}

const infoWeather = async (text) => {
    const citySearch = await getCity(text);
    const detailsWeather = await DailyForecasts(citySearch.Key);
    const arr = detailsWeather.DailyForecasts;
    let html = ``;
    console.log(detailsWeather)
    arr.forEach(p => {
        console.log(p.Day);
        console.log(p.Temperature.Maximum.Value);
        console.log(temperatureConverter(p.Temperature.Maximum.Value))
        console.log(temperatureConverter(p.Temperature.Minimum.Value))
        console.log(p.Date);
        const dateConv = moment(p.Date).format('DD/MM/YYYY');
        console.log(dateConv);
        html += `<div class="box">Date:${dateConv}</br>
Temperature:${temperatureConverter(p.Temperature.Minimum.Value)}-${temperatureConverter(p.Temperature.Maximum.Value)}độ
 </br>Day:${p.Day.IconPhrase},${p.Day.PrecipitationType},${p.Day.PrecipitationIntensity}
 </br>Night:${p.Night.IconPhrase},${p.Night.PrecipitationType},${p.Night.PrecipitationIntensity}
</div>`


    })
    document.getElementById("list").innerHTML = html;
    return {
        citySearch: citySearch,
        detailsWeather: detailsWeather
    }
}
const temperatureConverter = (valNum) => {
    valNum = parseFloat(valNum);
    return Math.ceil((valNum - 32) / 1.8);
}
const formSearch = document.querySelector("form");

formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputSearch = formSearch.textSearch.value.trim();
    formSearch.reset();
    infoWeather(inputSearch);

});






