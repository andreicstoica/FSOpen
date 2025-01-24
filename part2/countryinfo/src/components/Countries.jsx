/* eslint-disable react/prop-types */
const Countries = ({countries, handleClick}) => {
    return (
        <ul>
            {countries.map(country => 
                <li key={country.name.common}>
                    {country.name.common}
                    <button value={country.name.common} onClick={handleClick}>show</button>
                </li>
            )}
        </ul>
    )
}

export default Countries