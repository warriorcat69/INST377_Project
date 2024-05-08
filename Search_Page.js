// Trip Advisor Search API
function tripAdvisorSearchAPI() {
    let search = document.getElementById("textSearch").value
    let category = document.getElementById("categorySearch").value
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    return fetch(`https://api.content.tripadvisor.com/api/v1/location/search?key=D981EA1A7F644418839A84DCC9A0D2BB&searchQuery=${search}&category=${category}&language=en`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
}

async function tripAdvisorSearch() {
    searchResults = await tripAdvisorSearchAPI()
    console.log(searchResults)
}
  