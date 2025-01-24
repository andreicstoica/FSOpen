const Persons = ({ persons, filterString, deletePerson}) => {
    return (
        <ul>
            {persons.filter(person =>
            person.name.toLowerCase().includes(filterString.toLowerCase()))
            .map(person => 
                <li key={person.name}>
                {person.name} {person.number}
                <button onClick={() => deletePerson(person.id)}>delete</button>                </li>
            )}
        </ul>
    )
}

export default Persons