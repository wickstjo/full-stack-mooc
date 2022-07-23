import { useEffect } from 'react'
import { View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../styles/sorting'
import Container from '../container'
import Option from './option'

import useField from '../../hooks/field'
import Field from '../inputs/field'

export default () => {

    // REDUX STUFF
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    // KEYWORD FIELD
    const keyword = useField({
        placeholder: 'Filter by keyword'
    })

    useEffect(() => {
        dispatch({
            type: 'filter/update_keyword',
            keyword: keyword.value
        })
    }, [keyword])

    // UPDATE FILTER
    const update_tag = (label) => {
        dispatch({
            type: 'filter/update_tag',
            tag: label
        })
    }

    return (
        <Container>
            <View style={ styles.container }>
                <Option
                    label={ 'latest' }
                    payload={[ update_tag, filter.tag ]}
                />
                <Option
                    label={ 'reviews' }
                    payload={[ update_tag, filter.tag ]}
                />
                <Option
                    label={ 'rating' }
                    payload={[ update_tag, filter.tag ]}
                    style={{
                        marginRight: 0
                    }}
                />
            </View>
            <Field
                { ...keyword }
                style={{
                    display: 'inline-block',
                    marginBottom: 0,
                    marginTop: 5,
                }}
            />
        </Container>
    )
}