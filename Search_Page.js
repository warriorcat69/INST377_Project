// Trip Advisor Search API 

function addressSearchAPI() {
    
    let street_address = (document.getElementById("addressSearch").value).replaceAll(" ", "%20")
    let zip_code = (document.getElementById("zipcodeSearch").value) 
    let city = (document.getElementById("citySearch").value) 
    let country = (document.getElementById("countrySearch").value) 
    
    return fetch(`https://api.geoapify.com/v1/geocode/search?text=${street_address}%2C%20${zip_code}%20${city}%2C%0${country}&format=json&apiKey=bb910db7a03a411682ff24837d460c0b`).then((res) => res.json());
}

let place = ""
let lat = ""
let lon = " "

async function locationSearch() {
    locationResults = await addressSearchAPI();
    place = locationResults["results"]["0"].place_id;
    lat = locationResults["results"]["0"].lat
    lon = locationResults["results"]["0"].lon
    
}

async function createMap() {
    await locationSearch()

    let map = L.map('map').setView([lat, lon], 13);

    // Create Map
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
}

async function geoApifySearchAPI() {

    await locationSearch()
    createMap()

    if (document.getElementById("categorySearch").value == "restaurant") {
        category = "catering.restaurant"

    } else if (document.getElementById("categorySearch").value == "attraction") {
        category = `tourism`

    } else if (document.getElementById("categorySearch").value == "hotel") {
        category = "accommodation.hotel"
    }
    
    return fetch(`https://api.geoapify.com/v2/places?categories=${category}&filter=place:${place}&limit=6&apiKey=bb910db7a03a411682ff24837d460c0b`).then((res) => res.json());
}

async function geoApifySearch() {
    APISearchResults = await geoApifySearchAPI()

    let searchResultsDiv = document.getElementById("searchResults")
    let searchResults = APISearchResults["features"]

    searchResults.forEach(item => {
        // Creating Elements
        itemProperties = item["properties"]

        console.log(itemProperties)

        const div = document.createElement('div');
        div.setAttribute("class", "searchDiv")
        div.setAttribute("id", "check")

        let location_name = document.createElement("h2")
        let underline = document.createElement("hr")
        let address1 = document.createElement("p")
        let city = document.createElement("p")
        let country = document.createElement("p")
        let region = document.createElement("p")

        // Add Item Contents to Elements
        location_name.innerHTML = itemProperties.address_line1
        address1.innerHTML = itemProperties.address_line2
        city.innerHTML = itemProperties.city
        country.innerHTML = itemProperties.country
        region.innerHTML = itemProperties.region

        // Append Elelements

        div.appendChild(location_name)
        div.appendChild(underline)
        div.appendChild(address1)
        div.appendChild(city)
        div.appendChild(country)
        div.appendChild(region)

        searchResultsDiv.appendChild(div)
    });

    searchResults.forEach(item => {
        // Add Markers
        itemProperties = item["properties"]
    });
}
