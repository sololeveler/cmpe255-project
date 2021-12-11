import './App.css';
import countryData from "./data_json.json"
import BasicDatePicker from "./Component/BasicDatePicker"
import MarkerMap from "./Component/MarkerMap"
import { Box, Autocomplete, TextField, Button } from "@mui/material"
import { useState } from 'react'
import axios from "axios"

function App() {
  const [countryCode, setCountryCode] = useState("")
  const [countryName, setCountryName] = useState("")
  const [address, setAddress] = useState("")
  const [weatherData, setWeatherData] = useState({})
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" })
  const [dateTime,setDateTime]  = useState(new Date())
  const handleAddressSearch = () => {
    console.log(address,countryCode)
    const code = countryCode.Code;
    const geocodingUrl = isNaN(address) 
    ? process.env.REACT_APP_GEOCODING_ADDRESS_API + `${address},${code}&limit=1&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}`
    : process.env.REACT_APP_GEOCODING_ZIP_API +`${address},${code}&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}`
    axios.get(geocodingUrl)
    .then(response => {
      isNaN(address)
      ?setCoordinates({latitude: response.data[0].lat, longitude: response.data[0].lon })
      : setCoordinates({latitude: response.data.lat, longitude: response.data.lon })
      const weatherUrl = process.env.REACT_APP_ONE_CALL_API + `lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=current,minutely,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_TOKEN}`
      axios.get(weatherUrl)
      .then(response=>{
        console.log(response)
      })
    })
    .catch(error=>alert(error))
  }
  return (
    <>
      <header style={{backgroundColor:"sky blue"}}>
        <Box sx={{ display: 'flex', justifyContent: "space-around"}} >
          <h3>Predicting Forest Fires</h3>
          <Box sx={{ display: "flex"}}>
            <TextField value={address} onChange={event => setAddress(event.target.value)} />
            <Autocomplete
              id="combo-box-demo"
              value={countryCode}
              inputValue={countryName}
              onInputChange={(event, newInput) => setCountryName(newInput.Name)}
              onChange={(event, newValue) => setCountryCode(newValue.Code)}
              options={countryData}
              getOptionLabel={item => item.Name || ""}
              sx={{ width: 180 }}
              renderInput={(params) => <TextField {...params} label="Country" />} />
              <BasicDatePicker dateTime={dateTime} setDateTime={setDateTime} />
            <Button variant='contained' onClick={handleAddressSearch}>Search</Button>
          </Box>
        </Box>
      </header>
      <main>
      <MarkerMap />
      </main>
    </>
  )
}

export default App;