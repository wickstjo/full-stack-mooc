import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Fragment } from 'react'

import Content from '../components/content'
import { Form, useField } from '../components/inputs'

const Books = () => {
    
    // GLOBAL STATE
    const { books } = useSelector(state => state.data)

    // FILTER FIELD
    const genre = useField({ placeholder: 'By genre' })
    const published = useField({ placeholder: 'By publication year' })
    const title = useField({ placeholder: 'By title' })

    // APPLY FILTER WHEN DEFINED
    const apply_filters = (data) => {
        let temp = [...data]

        // APPLY GENRE FILTER
        if (genre.value !== '') {
            temp = temp.filter(book => book.genres.includes(genre.value))
        }

        // APPLY TITLE FILTER
        if (title.value !== '') {
            temp = temp.filter(book => book.title.includes(title.value))
        }

        // APPLY PUBLISH FILTER
        if (published.value !== '') {
            temp = temp.filter(book => String(book.published) === published.value)
        }

        return temp
    }

    // LOCAL STATE
    const filtered = apply_filters(books)
    const header = `All books (${ books.length })`
    const fallback = 'No books currently exist in the database.'

    return (
        <Fragment>
            { books.length > 0 ?
                <Form
                    header={ 'Filter books' }
                    fields={[ genre, published, title ]}
                    button={ false }
                    reset={ false }
                />
            : null }
            <Content payload={[ header, fallback, books ]}>
                { filtered.map(item =>
                    <div key={ item.id }>
                        <div><Link to={ `/books/${ item.id }` }>{ item.title }</Link></div>
                        <div>Published { item.published }</div>
                    </div>
                )}
            </Content>
        </Fragment>
    )
}

export default Books