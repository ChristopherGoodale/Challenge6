//global variables
let searchBtn = document.querySelector("#searchBtn")
let requestUrl = [];
let fiveDayUrl = [];
let cityDiv
let cities = JSON.parse(localStorage.getItem())
let searchedCities = JSON.parse(localStorage.getItem("cities")) || [];

//divs on other side of html

//functions
function fiveDayForecast(forecastData) {
    forecastData.forEach((day) => {
        let midnight = day.dt_txt.split(" ")[1];
        if (midnight === "00:00:00") {
            console.log(day.dt_txt)
            const dayCard = document.createElement("div")
            dayCard.innerHTML += `<div>${day.dt_txt}</div>\n<div>${day.main.temp}</div>\n<div>${day.main.humidity}</div>`
            fiveDayForecast.append(dayCard)
        };
    });
};

function handleGetResults() {
    //grab last search results from storage // display left side of page
}

function searchCity() {
    // set assign variable to value of textbox on html page
    let city = 'chicago'
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=d37ae3d48dcfb1d283849a04c6912cd3`
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // code goes here
            currentCity.innerHTML = `${data.city.name}`;
            currentTemp.innerHTML = `${data.list[0].main.temp}`;
            currentWind.innerHTML = `${data.list[0].wind.speed}`;
            current.HUMi.innerHTML = `${data.list[0].main.humidity}`;
            //chicago
            data.list.forEach((day) => {
                let midnight = day.dt_txt.split(" ")[1];
                if (midnight === "00:00:00") {
                    let dayCard = document.createElement("div")
                    dayCard = document.innerHTML = `<div>${day.dt_txt}</div>`;
                    dayCard = document.innerHTML = `<div>${day.main.temp}</div>`;
                    dayCard = document.innerHTML = `<div>${day.main.humidity}</div>`;
                    forcastCards.append(dayCard)
                }
            })
            console.log(data);
        });
}
function search() {
    $("tr").each(function (index, value) {
        if (index > 0 && !$(this).find("td")[0].innerText.toLowerCase().includes($("#searchBtn").val().toLowerCase())) {
            $(this).attr("hidden", true);
        } else {
            $(this).removeAttr("hidden");
        }
        console.log(value);
    })
}

//function calls

//event Listeners
init()

//search button eventlistener
searchBtn.addEventListener("click", searchCity)



//click on past search buttons