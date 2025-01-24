/* eslint-disable react/prop-types */
import Weather from "./Weather"

const Country = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            capital: {country.capital} <br />
            area: {country.area} <br />
            languages: 
            <ul>
                {Object.values(country.languages).map(language => 
                <li key={language}>
                    {language}
                </li>)}
            </ul>
            <img src={country.flags.png} alt='country flag' width='20%'/>
            <h1>Weather in {country.capital}</h1>
            <Weather capital={country.capital} />            
        </div>
    )
}

export default Country