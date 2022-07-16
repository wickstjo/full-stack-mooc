import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Content from '../components/content'

const Authors = () => {

    // GLOBAL STATE
    const { authors } = useSelector(state => state.data)

    // LOCAL STATE
    const header = `All authors (${ authors.length })`
    const fallback = 'No authors currently exist in the database.'

    return (
        <Content payload={[ header, fallback, authors ]}>
            { authors.map(item =>
                <div key={ item?.id }>
                    <div><Link to={ `/authors/${ item?.id }` }>{ item?.name }</Link></div>
                    <div>{ item?.born }</div>
                </div>
            )}
        </Content>
    )
}

export default Authors