import { useState, useEffect } from "react";
import Header from './header.js'

const Phonebook = ({ header, data, keyword, remove }) => {

    // FILTERED RESULTS
    const [filtered, set_filtered] = useState([])

    // FILTER OUT GARBAGE WHEN DATA CHANGES -- FORCE LOWERCASE
    useEffect(() => {
        set_filtered(data.filter(
            entry => entry.name.toLowerCase().includes(keyword.toLowerCase())
        ))
    }, [data, keyword])

    return (
        <div className={ 'wrapper' }>
            <Header text={ header } />
            <div className={ 'phonebook' }>
                <Content
                    data={ filtered }
                    remove={ remove }
                />
            </div>
        </div>
    )
}

const Content = ({ data, remove }) => {
    switch (data.length) {

        // NO CONTENT FOUND, RENDER NOTHING
        case 0: { return (
            <div className={ 'item' }>No people found.</div>
        )}

        // OTHERWISE, RENDER NORMALLY
        default: { return (
            data.map(entry =>
                <div className={ 'item' } key={ entry._id }>
                    <div>{ entry.name }</div>
                    <div>{ entry.number }</div>
                    <div>
                        <Trigger
                            label={ 'Remove' }
                            func={ () => remove(entry._id) }
                        />
                    </div>
                </div>
            )
        )}
    }
}

const Trigger = ({ label, func }) => { return (
    <span className={ 'trigger' } onClick={ func }>{ label }</span>
)}

export default Phonebook;