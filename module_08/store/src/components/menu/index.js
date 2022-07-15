import './menu.scss'
import { useSelector, useDispatch } from 'react-redux'
import { Item, Trigger } from './items'
import { Fragment } from 'react'

const Menu = () => { return (
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
            <Item
                label={ 'Users' }
                target={ '/users' }
            />
            <Swapper />
        </div>
    </div>
)}

// AUTH BASED OPTIONS
const Swapper = () => {

    // REDUX HOOKS
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    switch (auth.session) {

        case true: { return (
            <Trigger
                label={ 'Create Book' }
                func={() => {
                    dispatch({
                        type: 'prompts/create_book'
                    })
                }}
            />
        )}

        default: { return (
            <Fragment>
                <Trigger
                    label={ 'Login' }
                    func={() => {
                        dispatch({
                            type: 'prompts/login'
                        })
                    }}
                />
                <Trigger
                    label={ 'Register' }
                    func={() => {
                        dispatch({
                            type: 'prompts/register'
                        })
                    }}
                />
            </Fragment>
        )}
    }
}

export default Menu