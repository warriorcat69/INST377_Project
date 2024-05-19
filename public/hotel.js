var host = window.location.origin;
console.log(host)

async function loadHotelData() {
 
    await fetch(`${host}/hotel`)
        .then((response) => response.json()) 
        .then((res) => {
            console.log(res)

            // Create a new table 
            var table = document.createElement('table')
            table.setAttribute('id', 'hotelInfo')

            var tableRow = document.createElement('tr')

            var tableHeading1 = document.createElement('th')
            tableHeading1.innerHTML = 'Hotel Name'
            tableRow.appendChild(tableHeading1)

            var tableHeading2 = document.createElement('th')
            tableHeading2.innerHTML = 'Hotel City'
            tableRow.appendChild(tableHeading2)

            var tableHeading3 = document.createElement('th')
            tableHeading3.innerHTML = 'Hotel Country'
            tableRow.appendChild(tableHeading3)

            table.appendChild(tableRow)

            //reverse order
            for (let i = res.length - 1; i >= 0; i--) {
                const hotel = res[i]
                var hotelRow = document.createElement('tr')
                var hotelName = document.createElement('td')
                var hotelCity = document.createElement('td')
                var hotelCountry = document.createElement('td')

                hotelName.innerHTML = hotel.hotel_name
                hotelRow.appendChild(hotelName)

                hotelCity.innerHTML = hotel.city_name
                hotelRow.appendChild(hotelCity)

                hotelCountry.innerHTML = hotel.country_name
                hotelRow.appendChild(hotelCountry)

                table.appendChild(hotelRow)
            }

            const preExistingTable = document.getElementById('hotelInfo')
            if (preExistingTable) {
                preExistingTable.remove()
            }
            var cutoff = document.getElementById('cutoff')
            cutoff.insertAdjacentElement('beforebegin', table)
        })
}

async function createHotel() {
    console.log('Creating Hotels')
    try {
        const response = await fetch(`${host}/hotel`, {
            method: 'POST',
            body: JSON.stringify({
                "hotelName": document.getElementById("hotelName").value,
                "countryName": document.getElementById("countryName").value,
                "cityName": document.getElementById("cityName").value,
            }),
            headers: {
                "Content-type": "application/json"
            }
        })

        const data = await response.json()
        console.log('Hotel created:', data)
        await loadHotelData(); 
    } catch (error) {
        console.error('Error creating hotel:', error)
    }
}

window.onload = loadHotelData;