// GLOBAL VARIABLES
let cityCriteria = document.querySelector("#cityCriteria");
let cityName = document.querySelector("#cityName");
let fiveDayDiv = document.querySelector("#fiveDayDiv");
let forecastDiv = document.querySelector("#forcastDiv");
let nowHumidity = document.querySelector("#nowHumidity");
let nowIcon = document.querySelector("#nowIcon");
let nowTemp = document.querySelector("#nowTemp");
let nowWind = document.querySelector("#nowWind");
let searchAreaDiv = document.querySelector("#searchAreaDiv");
let searchBtn = document.querySelector("#searchBtn");

let appId = "6f57d6d3c3e1f8a8f7f076e94dc36c01";
let searchHistory = [];
let hcityToSearch = cityCriteria.value;


// FUNCTIONS
function init() {
    // grab last search results from local storage, place on left side of page
    searchHistory = JSON.parse(localStorage.getItem("cityCriteria")) || [];
    searchAreaDiv.innerHTML = "";
    searchHistory.forEach((search) => {
        let searchHistoryBtn = document.createElement("button");
        searchHistoryBtn.textContent = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
        //       searchHistoryBtn.textContent = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
        searchHistoryBtn.setAttribute("class", "bg-[#0197f6] w-full p-4 text-white font-bold");
        searchHistoryBtn.setAttribute("id", "searchHistoryBtn");
        searchHistoryBtn.setAttribute("name", "cityButton");
        searchHistoryBtn.setAttribute("city", search.toUpperCase());
        searchHistoryBtn.addEventListener("click", searchHistoryFunction);
        searchAreaDiv.appendChild(searchHistoryBtn);
    });
    // If nothing in local storage display none
}

//
function citySearch() {
    // Set City to change with the .val of the text input box
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${cityCriteria.value}&units=imperial&appid=${appId}`;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Clear Previous Information
            forecastDiv.innerHTML = "";

            let date = data.list[0].dt_txt.split(" ");
            let [year, month, day] = date[0].split("-");
            let nowDate = [month, day, year].join("-");
            cityName.innerHTML = `${data.city.name} (${nowDate})`;
            nowTemp.innerHTML = `TEMP: ${data.list[0].main.temp}`;
            nowWind.innerHTML = `WIND: ${data.list[0].wind.speed}`;
            nowHumidity.innerHTML = `HUMIDITY: ${data.list[0].main.humidity}%`;
            nowIcon.src = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
            nowIcon.alt = `${data.list[0].weather[0].main} icon`;

            // Five day Forecast

            data.list.forEach((list) => {
                let noon = list.dt_txt.split(" ");
                if (noon[1] === "12:00:00") {
                    let [year, month, day] = noon[0].split("-");
                    let listDate = [month, day, year].join("-");
                    let listIcon = `https://openweathermap.org/img/w/${list.weather[0].icon}.png`;
                    let listIconAlt = `${list.weather.main} icon`;
                    let listTemp = list.main.temp;
                    let listWind = `${list.wind.speed} MPH`;
                    let listHumidity = `${list.main.humidity}%`;
                    fiveDayDiv.setAttribute("class", "w-100 p-4 flex justify-between bg-[#02182B] text-white");
                    forecastDiv.innerHTML += `<div class="flex flex-col border-2 border-[#0197f6] min-w-125 grow items-center bg-white"><div class="bg-[#0197f6] text-white w-full text-center font-semibold">${listDate}</div><img class="w-16 h-16" src="${listIcon}" alt="${listIconAlt}"></img><div>Temp: ${listTemp}</div><div>Wind: ${listWind}</div><div>Humidity: ${listHumidity}</div></div>`;
                }
            });
            let citySave = cityCriteria.value;
            if (searchHistory.includes(citySave.toUpperCase())) {
                return;
            } else {
                searchHistory.unshift(citySave.toUpperCase());
                searchHistory = searchHistory.slice(0, 6);
                console.log(searchHistory);
                localStorage.setItem("citySearch", JSON.stringify(searchHistory));
                init();
            }
        });
}

function searchHistoryFunction() {
    cityToSearch = this.getAttribute("city");
    city.value = cityToSearch;
    cityCriteria();
}

// EVENT LISTENERS
init();

// searchBTN event listener
searchBtn.addEventListener("click", citySearch);
