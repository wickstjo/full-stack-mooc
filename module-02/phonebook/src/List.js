const List = ({ data, keyword }) => {

    // FILTER OUT GARBAGE -- FORCE LOWERCASE
    const filtered = data.filter(
        person => person.name.toLowerCase().includes(keyword.toLowerCase())
    )
    
    switch (filtered.length) {

        // NO PEOPLE FOUND
        case 0: { return (
            <li>No-one matches keyword "{ keyword }"</li>
        )}

        // RENDER PEOPLE
        default: { return (
            filtered.map(person =>
                <li key={ person.id }>{ person.name }: { person.number }</li>
            )
        )}
    }
}

export default List;