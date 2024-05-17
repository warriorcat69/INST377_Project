const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://kmphtrwdjfkhholtwjnt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcGh0cndkamZraGhvbHR3am50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2NDQ1NjIsImV4cCI6MjAzMTIyMDU2Mn0.gmZ9Z_GcU_Hs4Y36umflt-tdrq2dzinBBsfZ2MVdktw'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/hotel', async (req, res) => {
    console.log('attempting to GET all hotels')

    const { data, error } = await supabase
        .from('hotel')
        .select()

    if (error) {
        console.log('error')
        res.send(error)
    } else {
        res.send(data)
    }
})

app.post('/hotel', async (req, res) => {
    console.log('Adding hotel')

    console.log(req.body)
    var hotelName = req.body.hotelName;
    var continentName = req.body.continentName;
    var cityName = cityName;
    var countryName = req.body.countryName;

    const { data, error } = await supabase
        .from('hotel')
        .insert({ 'hotel_name': hotelName, 'continent_name': continentName, 'city_name': cityName, 'country_name': countryName })
        .select()

    if (error) {
        console.log(error)
        res.send(error)
    } else {
        res.send(data)
    }
})

app.listen(port, () => {
    console.log('App works!')
})