import './App.css';
import countryData from "./data_json.json"
import BasicDatePicker from "./Component/BasicDatePicker"
import MarkerMap from "./Component/MarkerMap"
import { Box, Autocomplete, TextField, Button } from "@mui/material"
import { useState } from 'react'
const dotenv = require("dotenv")

function App() {
  const [countryCode, setCountryCode] = useState("")
  const [countryName, setCountryName] = useState("")
  const [address, setAddress] = useState("")
  const [weatherData, setWeatherData] = useState({})
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" })
  const [dateTime,setDateTime]  = useState(new Date())
  const handleAddressSearch = () => {
    console.log("heheh")
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
              onInputChange={(event, newInput) => setCountryName(newInput)}
              onChange={(event, newValue) => setCountryCode(newValue)}
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