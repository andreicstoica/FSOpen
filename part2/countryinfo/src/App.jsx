import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [filterString, setFilterString] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.error('Error fetching countries: ', error)
      })
  }, []) // empty array means this effect will only run once

  useEffect(() => {
    if (filterString === '') {
      setFilteredCountries(countries)
    } else {
      const filtered = countries.filter(country => 
        country.name.common.toLowerCase().includes(filterString.toLowerCase())
      )
      setFilteredCountries(filtered)
      //console.log(filtered);
    }
  }, [countries, filterString])

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }
 
  const handleClick = (event) => {
    //console.log('clicked');
    setFilterString(event.target.value)
  }
  
  return (
    <>
      <h1>Country Info</h1>
      <Filter val={filterString} changeFunc={handleFilterChange} />
      {filteredCountries.length > 10 && (<p>Too many countries, please refine search</p>)}
      {filteredCountries.length <= 10 && filteredCountries.length > 1 && <Countries countries={filteredCountries} handleClick={handleClick} />}
      {filteredCountries.length === 1 && <Country country={filteredCountries[0]} />}
    </>
  )
}

export default App
