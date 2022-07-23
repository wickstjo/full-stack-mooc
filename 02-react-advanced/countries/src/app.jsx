import './ui/styles.scss'

import Wrapper from './components/wrapper'
import Form from './components/form';
import Country from './components/country'

import useResource from './hooks/resource'
import useField from './hooks/field'

const App = () => {

    const [data] = useResource({
        url: 'https://restcountries.com/v3.1/all'
    })

    const filter = useField({
        placeholder: 'Enter a country name',
    })

    const filtered = data.filter(
        item => item.name.common.toLowerCase().includes(filter.value.toLowerCase())
    )

    return (
        <div id={ 'main' }>
            <Form
                header={ 'Find countries by name' }
                fields={[ filter ]}
            />
            <Swapper
                data={ filtered }
                select={ filter.inject }
            />
        </div>
    )
}

const Swapper = ({ data, select }) => {
    
    if (data.length === 0) { return (
        <Wrapper header={ 'results' }>
            <div>No results found.</div>
        </Wrapper>
    )}

    if (data.length === 1) { return (
        <Country target={ data[0] } />
    )}

    if (data.length < 10) { return (
        <Wrapper header={ 'results' }>
            { data.map(country =>
                <div key={ country.name.common }>
                    <div>{ country.name.common }</div>
                    <div onClick={ () => select(country.name.common) }>
                        <span id={ 'action' }>Select</span>
                    </div>
                </div>
            )}
        </Wrapper>
    )}

    return (
        <Wrapper header={ 'results' }>
            <div>Too many matches ({ data.length })</div>
        </Wrapper>
    )
}

// const Result = ({ data, keyword, set_keyword }) => {

//     // FILTER OUT GARBAGE -- FORCE LOWERCASE
//     const filtered = data.filter(
//         item => item.name.common.toLowerCase().includes(keyword.toLowerCase())
//     )
    
//     if (keyword === '') { 
//         return null;

//     // TOO MANY MATCHES
//     } else if (filtered.length > 10) { return (
//         <Fragment>
//             <Header text={ 'Query Result' } />
//             <li>Too many results with keyword "{ keyword }"</li>
//         </Fragment>

//     // BETWEEN 2 AND 10 RESULTS
//     )} else if (filtered.length > 1 && filtered.length < 10) { return (
//         <Fragment>
//             <Header text={ 'Countries' } />
//             { filtered.map(item =>
//                 <li key={ item.name.common }>
//                     <span className={ 'padded' }>{ item.name.common }</span>
//                     <Button
//                         label={ 'show' }
//                         func={ () => set_keyword(item.name.common) }
//                     />
//                 </li>
//             )}
//         </Fragment>
    
//     // OTHERWISE, PRESENT SINGLE COUNTRY
//     )} else if (filtered.length === 1) { return (
//         <Country target={ filtered[0] } />
    
//     // OTHERWISE, RENDER NOTHING
//     )} else { return null }
// }

// const Button = ({ label, func }) => { return (
//     <button onClick={ func }>{ label }</button>
// )}

export default App;