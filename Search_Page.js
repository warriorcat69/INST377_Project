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

    map.off();

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

function geoApifyDetailsAPI(placeId) {
    return fetch(`https://api.geoapify.com/v2/place-details?id=${placeId}&apiKey=bb910db7a03a411682ff24837d460c0b`).then((res) => res.json());
}

async function geoApifySearch() {
    APISearchResults = await geoApifySearchAPI()

    if (document.getElementById("searchResults").innerHTML !== "") {
        document.getElementById("searchResults").innerHTML = ""
    } 

    let searchResultsDiv = document.getElementById("searchResults")
    let searchResults = APISearchResults["features"]

    searchResults.forEach(item => {
        // Creating Elements
        itemProperties = item["properties"]

        const div = document.createElement('div');
        div.setAttribute("class", "searchDiv");
        div.setAttribute("id", itemProperties.place_id);

        let location_name = document.createElement("h2")
        let underline = document.createElement("hr")
        let address1 = document.createElement("p")
        let region = document.createElement("p")

        // Add Item Contents to Elements
        location_name.innerHTML = itemProperties.address_line1
        address1.innerHTML = itemProperties.address_line2
        region.innerHTML = itemProperties.region

            // Get Place Details 
            if (itemProperties.categories[0] == "catering") {
                geoApifyDetailsRestaraunt(itemProperties.place_id);
            } else if (itemProperties.categories[0] == "tourism") {
                geoApifyDetailsAttraction(itemProperties.place_id);
            } else if (itemProperties.categories[0] == "accommodation") {
                geoApifyDetailsHotel(itemProperties.place_id);
            }

        div.appendChild(location_name)
        div.appendChild(underline)
        div.appendChild(address1)
        div.appendChild(region)

        searchResultsDiv.appendChild(div)
    });
}

async function geoApifyDetailsRestaraunt(place) {
    placeDetails = await geoApifyDetailsAPI(place) 

    let restarauntDetails = placeDetails.features[0].properties

    // Define Items
    let div = document.getElementById(place)
    let cuisine = document.createElement("p")
    let website = document.createElement("p")
    let phone = document.createElement("p")
    let facilities = document.createElement("p")

    if (restarauntDetails.catering !== undefined) {
        cuisine.innerHTML = `Cuisine: ${restarauntDetails.catering.cuisine}`
    } else {
        cuisine.innerHTML = `Cuisine: Unknown`
    }

    if (restarauntDetails.website !== undefined) {
        website.innerHTML = `Website: ${restarauntDetails.website}`
    } else {
        website.innerHTML = `Website: Unknown`
    }

    if (restarauntDetails.contact !== undefined) {
        phone.innerHTML = `Phone: ${restarauntDetails.contact.phone}`
    } else {
        phone.innerHTML = `Phone: Unknown`
    }

    if (restarauntDetails.facilities !== undefined) {
        if (restarauntDetails.facilities.wheelchair !== undefined) {
        facilities.innerHTML =  `Wheelchair?: ${restarauntDetails.facilities.wheelchair}`
        }
    } else {
        facilities.innerHTML = `Wheelchair: Unknown`
    }

    // Append Items
    div.appendChild(cuisine)
    div.appendChild(website)
    div.appendChild(phone)
    div.appendChild(facilities)
}

async function geoApifyDetailsAttraction(place) {
    placeDetails = await geoApifyDetailsAPI(place) 
    let attractionDetails = placeDetails.features[0].properties

    // Define Items
    let div = document.getElementById(place)
    let placetype = document.createElement("p")
    let facilities = document.createElement("p")

    if (attractionDetails.historic !== undefined) {
        placetype.innerHTML = `Type: ${attractionDetails.historic.type}`
    } else {
        placetype.innerHTML = `Type: Unknown`
    }

    if (attractionDetails.facilities !== undefined) {
        if (attractionDetails.facilities.wheelchair !== undefined) {
        facilities.innerHTML =  `Wheelchair?: ${attractionDetails.facilities.wheelchair}`
        }
    } else {
        facilities.innerHTML = `Wheelchair: Unknown`
    }

    // Append Items
    div.appendChild(placetype)
    div.appendChild(facilities)
}

async function geoApifyDetailsHotel(place) {
    placeDetails = await geoApifyDetailsAPI(place) 
    let hotelDetails = placeDetails.features[0].properties
    console.log(hotelDetails)

    // Define Items
    let div = document.getElementById(place)
    let website = document.createElement("p")
    let phone = document.createElement("p")

    if (hotelDetails.website !== undefined) {
        website.innerHTML = `Website: ${hotelDetails.website}`
    } else {
        website.innerHTML = `Website: Unknown`
    }

    if (hotelDetails.contact !== undefined) {
        phone.innerHTML = `Phone: ${hotelDetails.contact.phone}`
    } else {
        phone.innerHTML = `Phone: Unknown`
    }

    // Append Items
    div.appendChild(website)
    div.appendChild(phone)

}