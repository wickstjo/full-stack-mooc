import './menu.scss'
import { Item } from './items'

const Menu = () => { return (
    <div id="menu">
        <div>
            <Item
                label={ 'Anecdotes' }
                target={ '/anecdotes' }
            />
            <Item
                label={ 'Create New' }
                target={ '/create' }
            />
            <Item
                label={ 'About' }
                target={ '/about' }
            />
        </div>
    </div>
)}

export default Menu