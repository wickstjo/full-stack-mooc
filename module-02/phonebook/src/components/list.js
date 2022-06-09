import { useState, useEffect } from 'react';
import { Button } from './input';

const List = ({ data, keyword, remove }) => {

    // FILTERED RESULTS
    const [filtered, set_filtered] = useState([])

    // FILTER OUT GARBAGE WHEN DATA CHANGES -- FORCE LOWERCASE
    useEffect(() => {
        set_filtered(data.filter(
            person => person.name.toLowerCase().includes(keyword.toLowerCase())
        ))
    }, [data, keyword])

    // CONDITIONAL RENDERING
    switch (filtered.length) {

        // NO PEOPLE FOUND
        case 0: { return (
            <div className={ 'row' }>
                No-one matches keyword "<b>{ keyword }</b>"
            </div>
        )}

        // RENDER PEOPLE
        default: { return (
            filtered.map(person =>
                <div className={ 'splitter' } key={ person.id }>
                    <div>{ person.name }</div>
                    <div>{ person.number }</div>
                    <div>
                        <button onClick={ () => remove(person.id) }>Remove</button>
                    </div>
                </div>
            )
        )}
    }
}

export default List;