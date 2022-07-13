import './menu.scss'
import { useDispatch } from 'react-redux'
import { Item, Trigger } from './items'

const Menu = () => {

    const dispatch = useDispatch()

    const create = () => {
        dispatch({
            type: 'prompts/create_book'
        })
    }
    
    return (
        <div id="menu">
            <div>
                <Item
                    label={ 'Books' }
                    target={ '/books' }
                />
                <Item
                    label={ 'Authors' }
                    target={ '/authors' }
                />
                <Trigger
                    label={ 'Create Book' }
                    func={ create }
                />
            </div>
        </div>
    )
}

export default Menu