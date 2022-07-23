import { Link } from 'react-router-dom';

// NORMAL MENU ITEM
const Item = ({ label, target }) => { return (
    <Link to={ target }>
        <li>{ label }</li>
    </Link>
)}

// TRIGGER MENU ITEM
const Trigger = ({ label, func }) => { return (
    <li onClick={ func }>{ label }</li>
)}

export {
    Item,
    Trigger
}