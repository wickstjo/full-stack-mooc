import { store as vote_store } from '../reducers/votes';

const Buttons = ({ keys }) => { return (
    keys.map((name, index) =>
        <Button
            label={ name }
            func={() => {
                vote_store.dispatch({
                    type: name
                })
            }}
            key={ index }
        />
    )
)}

const Button = ({ label, func }) => { return (
    <button onClick={ func }>{ label }</button>
)}

export default Buttons;