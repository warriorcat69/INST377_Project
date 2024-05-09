// Trip Advisor Search API 

function addressSearchAPI() {
    // (11 Av. de la Bourdonnais, 75007 Paris, France):
    
    let street_address = (document.getElementById("addressSearch").value).replaceAll(" ", "%20")
    let zip_code = (document.getElementById("zipcodeSearch").value) 
    let city = (document.getElementById("citySearch").value) 
    let country = (document.getElementById("countrySearch").value) 
    
    return fetch(`https://api.geoapify.com/v1/geocode/search?text=${street_address}%2C%20${zip_code}%20${city}%2C%0${country}&format=json&apiKey=bb910db7a03a411682ff24837d460c0b`).then((res) => res.json());
}

let place = ""

async function locationSearch() {
    locationResults = await addressSearchAPI();
    place = locationResults["results"]["0"].place_id;
}

async function geoApifySearchAPI() {

    await locationSearch()

    if (document.getElementById("categorySearch").value == "restaurant") {
        category = "catering.restaurant"

    } else if (document.getElementById("categorySearch").value == "attraction") {
        category = `tourism`

    } else if (document.getElementById("categorySearch").value == "hotel") {
        category = "accommodation.hotel"
    }
    
    return fetch(`https://api.geoapify.com/v2/places?categories=${category}&filter=place:${place}&limit=20&apiKey=bb910db7a03a411682ff24837d460c0b`).then((res) => res.json());
}

async function geoApifySearch() {
    searchResults = await geoApifySearchAPI()
    console.log(searchResults)
}
